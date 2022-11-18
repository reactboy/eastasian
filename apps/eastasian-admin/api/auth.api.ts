import { axios } from '@admin/libs/axios';

export const authorizeUser = async () => {
  try {
    const {
      data: { user },
    } = await axios.post('/auth/authorize');
    return user;
  } catch (e) {
    console.error(e);
  }
};
