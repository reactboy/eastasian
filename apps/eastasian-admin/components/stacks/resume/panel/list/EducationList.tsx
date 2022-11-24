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

type EducationListProps = {
  onEdit: (id: string) => () => void | Promise<void>;
  onDelete: (id: string) => () => void | Promise<void>;
  educations: any[];
  loading: boolean;
};

export const EducationList: FC<EducationListProps> = (props) => {
  const { onEdit, onDelete, educations, loading } = props;

  return (
    <>
      <LoadingOverlay visible={loading} />
      <CardList>
        {educations.map((education, i) => (
          <CardListItem
            onEdit={onEdit(education.id)}
            onDelete={onDelete(education.id)}
            key={education.id}
          >
            <CardListItemTitle>
              {education.title} / {education.titleJp}
            </CardListItemTitle>
            <Text
              sx={{ fontSize: '12px', fontWeight: 'bold', color: '#339AF0' }}
            >
              {getDefaultDate(education.startDate, 'yyyy.MM.dd')} -
              {getDefaultDate(education.endDate, 'yyyy.MM.dd')}
            </Text>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box>
                <CardLabel>organization</CardLabel>
                <Text>{education.organization}</Text>
              </Box>
              <Box>
                <CardLabel>location</CardLabel>
                <Text>{education.location}</Text>
              </Box>
            </Box>
            <CardLabel>body</CardLabel>
            <CardItemBodyText>{education.body}</CardItemBodyText>
            <CardLabel>bodyJp</CardLabel>
            <CardItemBodyText>{education.bodyJp}</CardItemBodyText>
          </CardListItem>
        ))}
      </CardList>
    </>
  );
};
