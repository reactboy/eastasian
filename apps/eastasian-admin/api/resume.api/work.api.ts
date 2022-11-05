import { axios } from '@admin/libs/axios';

const endpoint = '/works';
const endpointWithId = (id: string) => `${endpoint}/${id}`;

export const readWork = async (id: string) => {
  return await axios.get(endpointWithId(id));
};

export const listWork = async () => {
  return await axios.get(endpoint);
};

export const createWork = async (paylaod) => {
  return await axios.post(endpoint, { ...paylaod });
};

export const updateWork = async (id: string, payload) => {
  return await axios.put(endpointWithId(id), { ...payload });
};

export const deleteWork = async (id: string) => {
  return await axios.delete(endpointWithId(id));
};
