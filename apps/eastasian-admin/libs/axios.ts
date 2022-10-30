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
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export { axiosInstance as axios };
