import { axios } from '@admin/libs/axios';

const endpoint = '/projects';
const endpointWithId = (id: string) => `${endpoint}/${id}`;

export const readProject = async (id: string) => {
  return await axios.get(endpointWithId(id));
};

export const listProject = async () => {
  return await axios.get(endpoint);
};

export const createProject = async (paylaod) => {
  return await axios.post(endpoint, { ...paylaod });
};

export const updateProject = async (id: string, payload) => {
  return await axios.post(endpointWithId(id), { ...payload });
};

export const deleteProject = async (id: string) => {
  return await axios.delete(endpointWithId(id));
};
