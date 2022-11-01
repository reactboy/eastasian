import { axios } from '@admin/libs/axios';

const endpoint = '/stacks';
const endpointWithId = (id: string) => `${endpoint}/${id}`;

export const readStack = async (id: string) => {
  return await axios.get(endpointWithId(id));
};

export const listStack = async () => {
  return await axios.get(endpoint);
};

export const createStack = async (paylaod) => {
  return await axios.post(endpoint, { ...paylaod });
};

export const updateStack = async (id: string, payload) => {
  return await axios.post(endpointWithId(id), { ...payload });
};

export const deleteStack = async (id: string) => {
  return await axios.delete(endpointWithId(id));
};
