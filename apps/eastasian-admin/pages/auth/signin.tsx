import { NextPage } from 'next';
import { useState } from 'react';
import { axios } from '@admin/libs/axios';
import { useCookiesToken } from '@admin/utils/hooks';

import { AuthLayout } from '@admin/components/layouts';
import { useUserStore } from '@admin/store';
import { useRouter } from 'next/router';

const Signin: NextPage = () => {
  const { set } = useCookiesToken();
  const { setUser } = useUserStore((store) => store);
  const router = useRouter();
  const [signinInput, setSigninInput] = useState({
    email: '',
    password: '',
  });

  const onChangeSigninInput = (key: keyof typeof signinInput) => (e) => {
    setSigninInput({
      ...signinInput,
      [key]: e.target.value,
    });
  };

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    const {
      data: { profile, authUser },
    } = await axios.post('/auth/signin', {
      ...signinInput,
    });
    //TODO(eastasian) ログインユーザのプロフィールもここでstoreに保存するか検討する
    console.log(profile, authUser);
    setUser({ id: authUser.user.id });
    set.access(authUser.session['access_token']);
    router.push('/');
  };

  return (
    <AuthLayout>
      <div>
        <form onSubmit={onSubmitSignin}>
          <h2>sign in</h2>
          <div>
            <input
              placeholder="email"
              value={signinInput.email}
              type="text"
              onChange={onChangeSigninInput('email')}
            />
          </div>
          <div>
            <input
              placeholder="password"
              value={signinInput.password}
              type="password"
              onChange={onChangeSigninInput('password')}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signin;
