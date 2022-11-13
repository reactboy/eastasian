import { FC, ReactNode } from 'react';
import {
  Text,
  Box,
  ActionIcon,
  List,
  Avatar,
  Table,
  LoadingOverlay,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';

import { getDefaultDate } from '@admin/libs/date';

const CardLabel: FC<{ children: ReactNode }> = (props) => {
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

const CardList: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return <List sx={{ listStyle: 'none' }}>{children}</List>;
};

const CardListItem: FC<{
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

const CardListItemTitle: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return (
    <Text sx={{ fontWeight: 'bold', fontSize: '18px', color: '#1864AB' }}>
      {children}
    </Text>
  );
};

const CardItemBodyText: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return <Text sx={{ whiteSpace: 'pre-wrap' }}>{children}</Text>;
};

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
              </Box>
            </CardListItem>
          );
        })}
      </CardList>
    </>
  );
};

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
              {getDefaultDate(experience.startDate)} -{' '}
              {getDefaultDate(experience.endDate) || 'present'}
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
