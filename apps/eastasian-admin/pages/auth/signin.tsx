import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useState } from 'react';
import {
  Button,
  TextInput,
  Title,
  Center,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthLayout } from '@admin/components/layouts';
import { useUserStore } from '@admin/store';
import { useCookiesToken } from '@admin/utils/hooks';
import { axios } from '@admin/libs/axios';

const schema = yup
  .object()
  .shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type Inputs = {
  email: string;
  password: string;
};

const Signin: NextPage = () => {
  const { set } = useCookiesToken();
  const { setUser } = useUserStore((store) => store);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmitSignin = async (d) => {
    try {
      setLoading(true);
      const {
        data: { profile, authUser },
      } = await axios.post('/auth/signin', {
        ...d,
      });
      //TODO(eastasian) ログインユーザのプロフィールもここでstoreに保存するか検討する
      console.log(profile, authUser);
      setUser({ id: authUser.user.id });
      set.access(authUser.session['access_token']);
      router.push('/');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Center>
        <form
          style={{ width: '320px', position: 'relative' }}
          onSubmit={handleSubmit(onSubmitSignin)}
        >
          <LoadingOverlay visible={loading} />
          <Title>eastasian-admin</Title>
          <Title order={2}>signin</Title>
          <Box mt="xs">
            <TextInput
              placeholder="email"
              error={errors?.email?.message}
              {...register('email')}
            />
          </Box>
          <Box mt="xs">
            <TextInput
              placeholder="password"
              type="password"
              error={errors?.password?.message}
              {...register('password')}
            />
          </Box>
          <Button
            sx={{
              width: '96px',
              marginTop: '10px',
              marginLeft: 'auto',
              display: 'block',
            }}
            type="submit"
          >
            signin
          </Button>
        </form>
      </Center>
    </AuthLayout>
  );
};

export default Signin;
