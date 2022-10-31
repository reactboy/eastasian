import styled from '@emotion/styled';
import { NextPage } from 'next';

import { AppLayout, Header } from '@admin/components/layouts';
import { ResumePanel } from 'components/stacks';

const StyledPage = styled.div`
  .page {
  }
`;

export const Index: NextPage = (_props) => {
  return (
    <AppLayout>
      <StyledPage>
        <Header />
        <ResumePanel />
      </StyledPage>
    </AppLayout>
  );
};

export default Index;
