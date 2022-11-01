import { axios } from '@admin/libs/axios';

const endpoint = '/educations';
const endpointWithId = (id: string) => `${endpoint}/${id}`;

export const readEducation = async (id: string) => {
  return await axios.get(endpointWithId(id));
};

export const listEducation = async () => {
  return await axios.get(endpoint);
};

export const createEducation = async (paylaod) => {
  return await axios.post(endpoint, { ...paylaod });
};

export const updateEducation = async (id: string, payload) => {
  return await axios.post(endpointWithId(id), { ...payload });
};

export const deleteEducation = async (id: string) => {
  return await axios.delete(endpointWithId(id));
};
