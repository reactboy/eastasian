import { FC } from 'react';
import { Box, ActionIcon, Avatar, Table, LoadingOverlay } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';

type StackListProps = {
  onEdit: (id: string) => () => Promise<void> | void;
  onDelete: (id: string) => () => Promise<void> | void;
  stacks: any;
  loading: boolean;
};

export const StackList: FC<StackListProps> = (props) => {
  const { onEdit, onDelete, loading, stacks } = props;

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Table>
        <thead>
          <tr>
            <th>icon</th>
            <th>name</th>
            <th>displayName</th>
            <th>link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stacks.map((stack) => {
            return (
              <tr key={stack.id}>
                <td>
                  <Avatar
                    sx={{ img: { objectFit: 'contain' } }}
                    src={stack.stackImage}
                  />
                </td>
                <td>{stack.name}</td>
                <td>{stack.displayName}</td>
                <td>{stack.link}</td>
                <Box component="td" sx={{ width: '20px' }}>
                  <Box sx={{ display: 'flex', gap: '5px' }}>
                    <ActionIcon onClick={onEdit(stack.id)}>
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon onClick={onDelete(stack.id)} color="red">
                      <IconTrash />
                    </ActionIcon>
                  </Box>
                </Box>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
