import Link from 'next/link';
import { ActionIcon, Box, Button, Flex, Text, Divider } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';

export const CodingDraftPanel = () => {
  return (
    <Box>
      <Box sx={{ padding: '8px' }}>
        <Flex justify="space-between" align="center">
          <ActionIcon variant="light">
            <Link href="/coding">
              <IconArrowLeft />
            </Link>
          </ActionIcon>
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
    </Box>
  );
};
