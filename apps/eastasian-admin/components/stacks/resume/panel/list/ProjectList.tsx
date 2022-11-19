import { FC } from 'react';
import { Text, Box, Avatar, LoadingOverlay } from '@mantine/core';

import { getDefaultDate } from '@admin/libs/date';

import {
  CardList,
  CardListItem,
  CardListItemTitle,
  CardItemBodyText,
  CardLabel,
} from './Card';

type ProjectListProps = {
  onEdit: (id: string) => () => void | Promise<void>;
  onDelete: (id: string) => () => void | Promise<void>;
  projects: any[];
  loading: boolean;
};

export const ProjectList: FC<ProjectListProps> = (props) => {
  const { projects, loading, onEdit, onDelete } = props;

  return (
    <>
      <LoadingOverlay visible={loading} />
      <CardList>
        {projects.map((project, i) => (
          <CardListItem
            onEdit={onEdit(project.id)}
            onDelete={onDelete(project.id)}
            key={i}
          >
            <>
              <CardListItemTitle>
                {project.title} / {project.titleJp}
              </CardListItemTitle>
              <Text
                sx={{ fontSize: '12px', fontWeight: 'bold', color: '#339AF0' }}
              >
                {getDefaultDate(project.startDate, 'yyyy.MM.dd')} -{' '}
                {getDefaultDate(project.endDate, 'yyyy.MM.dd')}
              </Text>
              <CardLabel>body</CardLabel>
              <CardItemBodyText>{project.body}</CardItemBodyText>
              <CardLabel>bodyJp</CardLabel>
              <CardItemBodyText>{project.bodyJp}</CardItemBodyText>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '8px',
                }}
              >
                {project.stacks.map((stack) => (
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
            </>
          </CardListItem>
        ))}
      </CardList>
    </>
  );
};
