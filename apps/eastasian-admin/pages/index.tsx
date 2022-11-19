import { NextPage } from 'next';

import { AppLayout, Header } from '@admin/components/layouts';
import { ResumePanel } from '@admin/components/stacks';

export const Index: NextPage = (_props) => {
  return (
    <AppLayout>
      <Header />
      <ResumePanel />
    </AppLayout>
  );
};

export default Index;
