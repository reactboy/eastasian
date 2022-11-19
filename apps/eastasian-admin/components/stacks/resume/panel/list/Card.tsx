import { FC, ReactNode } from 'react';
import { Text, Box, ActionIcon, List } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';

export const CardList: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return <List sx={{ listStyle: 'none' }}>{children}</List>;
};

export const CardListItem: FC<{
  children: ReactNode;
  onEdit: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
}> = (props) => {
  const { children, onEdit, onDelete } = props;
  return (
    <List.Item
      sx={{
        padding: '12px',
        boxSizing: 'border-box',
        border: '2px solid #E9ECEF',
        borderRadius: '8px',
        position: 'relative',
        ':not(:first-of-type)': {
          marginTop: '8px',
        },
      }}
    >
      {children}
      <Box
        sx={{
          display: 'flex',
          gap: '5px',
          position: 'absolute',
          top: '0',
          right: '4px',
        }}
      >
        <ActionIcon onClick={onEdit}>
          <IconEdit />
        </ActionIcon>
        {onDelete && (
          <ActionIcon onClick={onDelete} color="red">
            <IconTrash />
          </ActionIcon>
        )}
      </Box>
    </List.Item>
  );
};

export const CardListItemTitle: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return (
    <Text sx={{ fontWeight: 'bold', fontSize: '18px', color: '#1864AB' }}>
      {children}
    </Text>
  );
};

export const CardItemBodyText: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return <Text sx={{ whiteSpace: 'pre-wrap' }}>{children}</Text>;
};

export const CardLabel: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return (
    <Text
      sx={{
        display: 'inline-block',
        backgroundColor: '#E7F5FF',
        color: '#1C7ED6',
        padding: '2px 4px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {children}
    </Text>
  );
};
