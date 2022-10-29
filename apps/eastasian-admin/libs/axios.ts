import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_HOST'],
  withCredentials: true,
});

export { axiosInstance as axios };
