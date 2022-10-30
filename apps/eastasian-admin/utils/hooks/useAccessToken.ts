import { setCookie, deleteCookie } from 'cookies-next';
export const useCookiesToken = () => {
  const setAccessToken = (token: string) => setCookie('access', token);
  const setRefreshToken = (token: string) => setCookie('refresh', token);
  const removeAccessToken = () => deleteCookie('access');
  const removeRefreshToken = () => deleteCookie('refresh');

  return {
    set: {
      access: setAccessToken,
      refresh: setRefreshToken,
    },
    remove: {
      access: removeAccessToken,
      refresh: removeRefreshToken,
    },
  };
};
