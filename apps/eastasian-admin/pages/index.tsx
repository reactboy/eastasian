import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { axios } from '@admin/libs/axios';
import { AppLayout } from '@admin/components/layouts';
import { useUserStore } from 'store/user.store';
import { deleteCookie } from 'cookies-next';

const StyledPage = styled.div`
  .page {
  }
`;

export const Index = (props) => {
  const router = useRouter();
  const userStore = useUserStore((store) => store);
  const [profiles, _setProifles] = useState(props.profiles);

  const onClickRequestProfiles = async () => {
    const {
      data: { profiles },
    } = await axios.get('/profiles');
    console.log(profiles);
  };

  const onClickAuthorize = async () => {
    const response = await axios.post('/auth/authorize');
    console.log(response);
  };

  const onClickSignout = async () => {
    deleteCookie('access');
    deleteCookie('refresh');
    const response = await axios.post('/auth/signout');
    console.log(response);
    userStore.setUser({ id: '' });
    router.push('/auth/signin');
  };

  return (
    <AppLayout>
      <StyledPage>
        <h1>eastasian admin</h1>
        <div>
          <button onClick={onClickRequestProfiles}>get profiles</button>
        </div>
        <div>
          <button onClick={onClickAuthorize}>authorized</button>
        </div>
        <div>
          <button onClick={onClickSignout}>signout</button>
        </div>
        <ul>
          {profiles.map((profile, i) => {
            return <li key={i}>{profile.name}</li>;
          })}
        </ul>
      </StyledPage>
    </AppLayout>
  );
};

export default Index;

export const getServerSideProps = async (_context) => {
  const {
    data: { profiles },
  } = await axios.get(`/profiles`);
  return {
    props: { profiles },
  };
};
