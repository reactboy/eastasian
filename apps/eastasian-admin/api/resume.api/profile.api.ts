import { axios } from '@admin/libs/axios';

const endpoint = '/profiles';
const endpointWithId = (id: string) => `${endpoint}/${id}`;

export const createProfile = async (payload) => {
  return await axios.post(endpoint, { ...payload });
};

export const readProfile = async (id: string) => {
  return axios.get(endpointWithId(id));
};

export const listProfile = async () => {
  return axios.get(endpoint);
};

export const updateProfile = async (id: string, payload) => {
  return axios.put(endpointWithId(id), { ...payload });
};
