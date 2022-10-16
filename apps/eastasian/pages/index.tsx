import styled from '@emotion/styled';

import { Header } from '@resume/components/layout';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  return (
    <StyledPage>
      <Header />
    </StyledPage>
  );
}

export default Index;
