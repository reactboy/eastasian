import { setCookie, deleteCookie, getCookie } from 'cookies-next';

export const useCookiesToken = () => {
  const getAccessToken = () => getCookie('access');
  const setAccessToken = (token: string) => setCookie('access', token);
  const removeAccessToken = () => deleteCookie('access');

  return {
    get: {
      access: getAccessToken,
    },
    set: {
      access: setAccessToken,
    },
    remove: {
      access: removeAccessToken,
    },
  };
};
