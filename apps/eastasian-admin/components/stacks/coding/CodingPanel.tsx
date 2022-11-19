import Link from 'next/link';
import { Title, Box, Flex, ActionIcon, Divider } from '@mantine/core';
import { IconFeather } from '@tabler/icons';

export const CodingPanel = () => {
  return (
    <Box>
      <Box sx={{ padding: '8px' }}>
        <Flex justify="space-between" align="center">
          <Title size="h2">Coding-collection</Title>
          <ActionIcon variant="light" color="gray.9">
            <Link href="/coding/draft">
              <IconFeather />
            </Link>
          </ActionIcon>
        </Flex>
      </Box>
      <Divider />
    </Box>
  );
};
