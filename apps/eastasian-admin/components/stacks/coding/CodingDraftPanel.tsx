import { useState } from 'react';
import Link from 'next/link';
import { ActionIcon, Box, Button, Flex, Text, Divider } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';

import { CodingDraft } from './CodingDraft';

export const CodingDraftPanel = () => {
  const [html, setHtml] = useState<string>('');

  const codingDraftListener = (html: string) => {
    setHtml(html);
  };

  return (
    <Box>
      <Box sx={{ padding: '8px' }}>
        <Flex justify="space-between" align="center">
          <Link href="/coding">
            <ActionIcon variant="light">
              <IconArrowLeft />
            </ActionIcon>
          </Link>
          {/* TODO(eastasian) タイトルが入るようにする */}
          <Text color="gray.5" weight="bolder">
            New Draft
          </Text>
          <Flex gap="10px">
            <Button>save</Button>
            <Button>publish</Button>
          </Flex>
        </Flex>
      </Box>
      <Divider />
      <Box sx={{ maxWidth: '980px', margin: '0 auto', padding: '0 16px' }}>
        <CodingDraft listener={codingDraftListener} />
        {html}
      </Box>
    </Box>
  );
};
