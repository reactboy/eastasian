import { FC } from 'react';
import { Text, Box, Avatar, LoadingOverlay } from '@mantine/core';

import {
  CardList,
  CardListItem,
  CardListItemTitle,
  CardItemBodyText,
  CardLabel,
} from './Card';

type WorkListProps = {
  onEdit: (id: string) => () => void | Promise<void>;
  onDelete: (id: string) => () => void | Promise<void>;
  works: any[];
  loading: boolean;
};

export const WorkList: FC<WorkListProps> = (props) => {
  const { onDelete, onEdit, works, loading } = props;
  return (
    <>
      <LoadingOverlay visible={loading} />
      <CardList>
        {works.map((work, i) => (
          <CardListItem
            onEdit={onEdit(work.id)}
            onDelete={onDelete(work.id)}
            key={i}
          >
            <CardListItemTitle>
              {work.title} / {work.titleJp}
            </CardListItemTitle>
            <CardLabel>body</CardLabel>
            <CardItemBodyText>{work.body}</CardItemBodyText>
            <CardLabel>bodyJp</CardLabel>
            <CardItemBodyText>{work.bodyJp}</CardItemBodyText>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box>
                <CardLabel>link</CardLabel>
                <Text color="blue">{work.link}</Text>
              </Box>
              <Box>
                <CardLabel>github</CardLabel>
                <Text color="blue">{work.github}</Text>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                marginTop: '8px',
                gap: '8px',
              }}
            >
              {work.stacks.map((stack) => (
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    img: { objectFit: 'contain' },
                  }}
                  key={stack.id}
                  src={stack.stackImage}
                >
                  {stack.displayName}
                </Avatar>
              ))}
            </Box>
          </CardListItem>
        ))}
      </CardList>
    </>
  );
};
