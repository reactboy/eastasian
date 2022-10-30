import { useState } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mantine/core';

import { axios } from '@admin/libs/axios';
import { AppLayout, Header } from '@admin/components/layouts';
import { ResumePanel } from 'components/stacks';

const StyledPage = styled.div`
  .page {
  }
`;

export const Index = (props) => {
  const [profiles, _setProifles] = useState(props.profiles);

  const onClickRequestProfiles = async () => {
    const {
      data: { profiles },
    } = await axios.get('/profiles');
    console.log(profiles);
  };

  return (
    <AppLayout>
      <StyledPage>
        <Header />
        <ResumePanel />
        <Box sx={{ marginTop: '10px' }}>
          <div>
            <button onClick={onClickRequestProfiles}>get profiles</button>
          </div>
          <ul>
            {profiles.map((profile, i) => {
              return <li key={i}>{profile.name}</li>;
            })}
          </ul>
        </Box>
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
