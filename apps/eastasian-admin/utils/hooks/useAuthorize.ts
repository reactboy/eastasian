import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { authorizeUser } from '@admin/api';
import { useUserStore } from '@admin/store';
import { useCookiesToken } from './useAccessToken';

export const useRedirectUnauthorize = (path) => {
  const cookieToken = useCookiesToken();
  const userStore = useUserStore((store) => store);
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      const user = await authorizeUser();
      if (!user) {
        cookieToken.remove.access();
        return router.push(path);
      }
      userStore.setUser({ id: user.id });
    };
    check();
  }, []);
};

export const useRedirectAuthorize = (path) => {
  const cookieToken = useCookiesToken();
  const userStore = useUserStore((store) => store);
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      if (!cookieToken.get.access()) return;
      const user = await authorizeUser();
      if (user) {
        userStore.setUser({ id: user.id });
        router.push(path);
      }
    };
    if (userStore.user.id) return;
    check();
  }, []);
};
