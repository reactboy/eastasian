import { NextPage } from 'next';

import { AppLayout, Header } from '@admin/components/layouts';
import { CodingPanel } from '@admin/components/stacks';

const Coding: NextPage = (_props) => {
  return (
    <AppLayout>
      <Header />
      <CodingPanel />
    </AppLayout>
  );
};

export default Coding;
