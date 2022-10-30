import axios from 'axios';
import { getCookie } from 'cookies-next';

const getAccessToken = () => {
  return getCookie('access');
};

const axiosInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_HOST'],
});

axiosInstance.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
  };
});

export { axiosInstance as axios };
