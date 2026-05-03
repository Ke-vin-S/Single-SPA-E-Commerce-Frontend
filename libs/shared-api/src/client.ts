import axios, { type AxiosInstance } from 'axios';
import { setupInterceptors } from './interceptors';

const baseURL =
  (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) ||
  'http://localhost:4001/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

setupInterceptors(apiClient);

export default apiClient;
