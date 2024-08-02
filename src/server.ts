import axios from 'axios';

export interface Resource {
  name: string;
  url: string;
  ogData?: {
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: [{
      url: string;
    }]
  }
}

// const router = axios.create({ baseURL: 'https://bookaburra-am7bw0fn.b4a.run/'})
const router = axios.create({ baseURL: 'http://localhost:3000/'})

const getResources = async (): Promise<[Resource]>  => {
  const { data } = await router.get('/all');
  return data;
};

const addResource = async (url: string): Promise<void> => {
  console.log(url)
  await router.post('/resource', {url})
}

export { getResources, addResource };