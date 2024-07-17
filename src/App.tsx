import { useState, useEffect } from 'react'
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
  });


  return (
    <>
      <h1>Roosources with Bookaburra</h1>
      <div className="card">
        {resources.map(r => (<><a href={r.url}><p>{r.name}</p></a></>))}
      </div>
    </>
  )
}

export default App
