import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { capitalize, truncate } from 'lodash';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from './components/ui/loader';

import Kangaroo from './assets/kangaroo.svg';
import { getResources, addResource, deleteResource } from './server';
import type { Resource } from './server';
import './App.css'

function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResourceUrl, setNewResourceUrl] = useState<string>('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allResources = await getResources();
        console.log(allResources)
        setResources([...allResources]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setRefresh(false);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      <div className='flex px-16 mt-4 items-center'>
        <img src={Kangaroo} className='h-12 w-12 mr-4'></img>
        <h1 className='text-4xl'>RooSources</h1>
      </div>
      <Separator className='mb-12 mt-4' />
      <div className='flex gap-16 px-16'>
        {resources.map((resource) => renderCard(resource, setRefresh))}
        {renderAddNewCard(newResourceUrl, refresh, setNewResourceUrl, setRefresh)}
      </div>
    </>
  )
}

function renderAddNewCard(newResourceUrl: string, refresh: boolean, setNewResourceUrl: Dispatch<SetStateAction<string>>, setRefresh: Dispatch<SetStateAction<boolean>>) {
  return (
    <Card className='bg-[#5f6c68] w-96 border-0 flex flex-col justify-between'>
      {refresh ? <Loader className='self-center m-auto' /> :
        <>
          <CardHeader>
            <CardTitle className='text-1xl flex gap-2'>
              <Input
                type='url'
                placeholder='https://vguleaev.dev/'
                value={newResourceUrl}
                onChange={(e) => setNewResourceUrl(e.target.value)} />
              <Button
                type='submit'
                onClick={async () => {
                  await addResource(newResourceUrl);
                  setNewResourceUrl('');
                  setRefresh(true);
                }}
              >
                Add
              </Button>
            </CardTitle>
            <CardDescription className='text-white pt-2 italic'>
              Number one blog post guy!
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <p className='text-xs italic text-white'>
              <a className='hover:text-[#1c1b22]' href='https://github.com/ldmccartin/roosources'>Roosources</a>
              {' '}powered by{' '}
              <a className='hover:text-[#1c1b22]' href='https://github.com/ldmccartin/bookaburra'>Bookaburra</a>
            </p>
          </CardFooter>
        </>}
    </Card>
  )
}

function renderCard(resource: Resource, setRefresh: Dispatch<SetStateAction<boolean>>) {
  const capitalisedName = truncate(capitalize(resource?.ogData?.ogTitle || resource.url), { length: 46 });
  const truncatedDescription = truncate(resource?.ogData?.ogDescription, { length: 100 })

  return (
    <Card key={`${resource._id}`} className='bg-[#5f6c68] w-96 border-0 flex flex-col justify-between'>
      <CardHeader>
        <a className='max-w-fit text-white' href={resource.url}>
          <CardTitle className='text-1xl'>{capitalisedName}</CardTitle>
          <CardDescription className='text-white pt-2'>
            {truncatedDescription || ''}
          </CardDescription>
        </a>

      </CardHeader>
      <CardFooter className='justify-between'>
        <p className='text-xs italic text-white'>
          <a className='hover:text-[#1c1b22]' href='https://github.com/ldmccartin/roosources'>Roosources</a>
          {' '}powered by{' '}
          <a className='hover:text-[#1c1b22]' href='https://github.com/ldmccartin/bookaburra'>Bookaburra</a>
        </p>
        <Button onClick={async () => {
        await deleteResource(resource._id);
        setRefresh(true);
      }}>
        Delete
      </Button>
      </CardFooter>
    </Card>
  )
}

export default App
