import axios from 'axios';

export interface resource {
  name: string,
  url: string
}

const router = axios.create({ baseURL: 'https://bookaburra-am7bw0fn.b4a.run/'})

const getResources = async (): Promise<[resource]>  => {
  const { data } = await router.get('/all');
  return data;
};

export { getResources };