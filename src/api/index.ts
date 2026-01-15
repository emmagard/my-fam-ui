import axios  from 'axios'; // AxiosResponse, AxiosError avail

export const api = axios.create({
  baseURL: 'http://localhost:3000/',
});