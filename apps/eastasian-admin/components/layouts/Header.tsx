import { useState } from 'react';
import { useUserStore } from '@admin/store';
import { useRouter } from 'next/router';
import { Button, Box, Title, Divider, LoadingOverlay } from '@mantine/core';

import { axios } from '@admin/libs/axios';
import { useCookiesToken } from '@admin/utils/hooks';

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
        }}
      >
        <Title>eastasian admin</Title>
        <Box>
          <Button onClick={onClickSignout}>signout</Button>
        </Box>
      </Box>
      <Divider />
      <LoadingOverlay visible={loading} />
    </>
  );
};
