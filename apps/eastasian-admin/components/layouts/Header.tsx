import { useState } from 'react';
import { useUserStore } from '@admin/store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Title,
  Divider,
  LoadingOverlay,
  ActionIcon,
  ActionIconProps,
  Button,
} from '@mantine/core';
import { IconCode, IconFile } from '@tabler/icons';

import { axios } from '@admin/libs/axios';
import { useCookiesToken } from '@admin/utils/hooks';

const activeValue = (
  currentPath: string,
  path: string,
  active: string,
  deactive: string
): string => {
  return currentPath === path ? active : deactive;
};

export const Header = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = useCookiesToken();
  const router = useRouter();
  const userStore = useUserStore((store) => store);

  const onClickSignout = async () => {
    try {
      setLoading(true);
      token.remove.access();
      await axios.post('/auth/signout');
      userStore.setUser({ id: '' });
      router.push('/auth/signin');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 8px',
        }}
      >
        <Title>eastasian🔮</Title>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <ActionIcon
              variant={
                activeValue(
                  router.pathname,
                  '/',
                  'light',
                  'subtle'
                ) as ActionIconProps['variant']
              }
              color={activeValue(router.pathname, '/', 'blue', 'gray')}
            >
              <Link href="/">
                <IconFile />
              </Link>
            </ActionIcon>
            <ActionIcon
              variant={
                activeValue(
                  router.pathname,
                  '/coding',
                  'light',
                  'subtle'
                ) as ActionIconProps['variant']
              }
              color={activeValue(router.pathname, '/coding', 'blue', 'gray')}
            >
              <Link href="/coding">
                <IconCode />
              </Link>
            </ActionIcon>
          </Box>
          <Button color="red" onClick={onClickSignout}>
            Signout
          </Button>
        </Box>
      </Box>
      <Divider />
      <LoadingOverlay visible={loading} />
    </>
  );
};
