import { NextPage } from 'next';
import { Box, Title } from '@mantine/core';

import { AppLayout, Header } from '@admin/components/layouts';

const Coding: NextPage = (_props) => {
  return (
    <AppLayout>
      <Header />
      <Box>
        <Title>Coding</Title>
      </Box>
    </AppLayout>
  );
};

export default Coding;
