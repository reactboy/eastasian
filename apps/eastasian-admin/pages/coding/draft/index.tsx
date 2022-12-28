import { NextPage } from 'next';
import { AppLayout, Header } from '@admin/components/layouts';
import { CodingDraftPanel } from '@admin/components/stacks';

const CodingDraft: NextPage = () => {
  return (
    <>
      <AppLayout>
        <Header />
        <CodingDraftPanel />
      </AppLayout>
    </>
  );
};

export default CodingDraft;
