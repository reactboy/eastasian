import { FC } from 'react';
import { Text, Box, Avatar, LoadingOverlay } from '@mantine/core';

import {
  CardList,
  CardListItem,
  CardListItemTitle,
  CardItemBodyText,
  CardLabel,
} from './Card';

type ProflieListProps = {
  onEdit: (id: string) => () => void | Promise<void>;
  loading: boolean;
  profiles: any[];
};
export const ProfileList: FC<ProflieListProps> = (props) => {
  const { onEdit, loading, profiles } = props;

  return (
    <>
      <LoadingOverlay visible={loading} />

      <CardList>
        {profiles.map((profile, i) => {
          return (
            <CardListItem key={i} onEdit={onEdit(profile.id)}>
              <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Avatar src={profile.profileImage} />
                <CardListItemTitle>
                  {profile.name} / {profile.nameJp}
                </CardListItemTitle>
              </Box>
              <CardLabel>descriptionJp</CardLabel>
              <CardItemBodyText>{profile.description}</CardItemBodyText>
              <CardLabel>descriptionJp</CardLabel>
              <CardItemBodyText>{profile.descriptionJp}</CardItemBodyText>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Box>
                  <CardLabel>instagram</CardLabel>
                  <Text color="blue">{profile.snsInstagram}</Text>
                </Box>
                <Box>
                  <CardLabel>github</CardLabel>
                  <Text color="blue">{profile.snsGithub}</Text>
                </Box>
                <Box>
                  <CardLabel>linkedin</CardLabel>
                  <Text color="blue">{profile.snsLinkedin}</Text>
                </Box>
              </Box>
            </CardListItem>
          );
        })}
      </CardList>
    </>
  );
};
