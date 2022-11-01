import { axios } from '@admin/libs/axios';

const endpoint = '/experiences';
const endpointWithId = (id: string) => `${endpoint}/${id}`;

export const readExperience = async (id: string) => {
  return await axios.get(endpointWithId(id));
};

export const listExperience = async () => {
  return await axios.get(endpoint);
};

export const createExperience = async (paylaod) => {
  return await axios.post(endpoint, { ...paylaod });
};

export const updateExperience = async (id: string, payload) => {
  return await axios.post(endpointWithId(id), { ...payload });
};

export const deleteExperience = async (id: string) => {
  return await axios.delete(endpointWithId(id));
};
