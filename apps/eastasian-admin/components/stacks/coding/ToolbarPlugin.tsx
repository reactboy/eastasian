import { Box, ActionIcon } from '@mantine/core';
import { IconLink, IconPhoto } from '@tabler/icons';

export const ToolbarPlugin = () => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid #E9ECEF',
        padding: '4px',
        borderRadius: '12px',
      }}
    >
      <ActionIcon variant="light" color="gray.6">
        <IconLink />
      </ActionIcon>
      <ActionIcon variant="light" color="gray.6">
        <IconPhoto />
      </ActionIcon>
    </Box>
  );
};
