import { FC } from 'react';
import { Text, Box, LoadingOverlay } from '@mantine/core';

import { getDefaultDate } from '@admin/libs/date';

import {
  CardList,
  CardListItem,
  CardListItemTitle,
  CardItemBodyText,
  CardLabel,
} from './Card';

type ExperienceListProps = {
  onDelete: (id: string) => () => void;
  onEdit: (id: string) => () => void;
  experiences: any[];
  loading: boolean;
};

export const ExperienceList: FC<ExperienceListProps> = (props) => {
  const { loading, experiences, onDelete, onEdit } = props;

  return (
    <>
      <LoadingOverlay visible={loading} />
      <CardList>
        {experiences.map((experience, i) => (
          <CardListItem
            key={experience.id}
            onEdit={onEdit(experience.id)}
            onDelete={onDelete(experience.id)}
          >
            <CardListItemTitle>
              {experience.title} / {experience.titleJp}
            </CardListItemTitle>
            <Text
              sx={{ fontSize: '12px', fontWeight: 'bold', color: '#339AF0' }}
            >
              {getDefaultDate(experience.startDate, 'yyyy.MM.dd')} -{' '}
              {getDefaultDate(experience.endDate, 'yyyy.MM.dd') || 'present'}
            </Text>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box>
                <CardLabel>organization</CardLabel>
                <Text>{experience.organization}</Text>
              </Box>
              <Box>
                <CardLabel>location</CardLabel>
                <Text>{experience.location}</Text>
              </Box>
            </Box>
            <CardLabel>body</CardLabel>
            <CardItemBodyText>{experience.body}</CardItemBodyText>
            <CardLabel>bodyJp</CardLabel>
            <CardItemBodyText>{experience.bodyJp}</CardItemBodyText>
          </CardListItem>
        ))}
      </CardList>
    </>
  );
};
