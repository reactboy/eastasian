import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_HOST'],
});

// TODO fix any
axiosInstance.interceptors.request.use((config: any) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
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
