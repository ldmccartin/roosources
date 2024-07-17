import { useState, useEffect } from 'react';
import { capitalize } from 'lodash';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"


import Kangaroo from './assets/kangaroo.svg';
import { getResources } from './server';
import type { resource } from './server';
import './App.css'

function App() {
  const [resources, setResources] = useState<resource[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allResources = await getResources();
        console.log(allResources)
        setResources([...allResources]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[]);


  return (
    <>
      <div className='flex px-16 mt-4 items-center'>
        <img src={Kangaroo} className='h-12 w-12 mr-4'></img>
        <h1 className='text-4xl'>RooSources</h1>
      </div>
      <Separator className='mb-12 mt-4'/>
      <div className='flex gap-16 px-16'>
        {resources.map(r => renderCard(r.name, r.url))}
      </div>
    </>
  )
}

function renderCard(name: string, url: string) {
  const capitalisedName = capitalize(name);
  return (
    
      <Card className='w-96'>
        <CardHeader>
        <a className='max-w-fit' href={url}>
          <CardTitle>{capitalisedName}</CardTitle>
        </a>
        
      </CardHeader>
      <CardFooter className='flex-row justify-between'>
        <p className='text-xs italic self-end'>
          <a className='text-blue-400' href='https://github.com/ldmccartin/roosources'>Roosources</a>
          {' '}powered by{' '}
          <a className='text-blue-400' href='https://github.com/ldmccartin/bookaburra'>Bookaburra</a>
        </p>
        <Button className='max-w-fit' variant="destructive">remove</Button>
      </CardFooter>
      </Card>
  )
}

export default App
