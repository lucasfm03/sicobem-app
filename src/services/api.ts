import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.7.24.96:3000',
  timeout: 10000,
});
