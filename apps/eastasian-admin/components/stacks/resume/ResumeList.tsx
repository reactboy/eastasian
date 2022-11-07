import { FC, useEffect, useState } from 'react';
import { Box, ActionIcon } from '@mantine/core';
import { Avatar, Table, LoadingOverlay } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';

import { listProfile } from '@admin/api';

export const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listProfile();
        setProfiles([...profiles, ...data.profiles]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Table>
        <thead>
          <tr>
            <th>profile</th>
            <th>name</th>
            <th>nameJp</th>
            <th>desciption</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, i) => {
            return (
              <tr key={i}>
                <td>
                  <Avatar src={profile.profileImage} />
                </td>
                <td>{profile.name}</td>
                <td>{profile.nameJp}</td>
                <td>{profile.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
      <Table>
        <thead>
          <tr>
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>organization</th>
            <th>location</th>
            <th>startDate</th>
            <th>endDate</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience, i) => (
            <tr key={experience.id}>
              <td>{experience.title}</td>
              <td>{experience.titleJp}</td>
              <td>{experience.body}</td>
              <td>{experience.bodyJp}</td>
              <td>{experience.organization}</td>
              <td>{experience.location}</td>
              <td>{experience.startDate}</td>
              <td>{experience.endDate}</td>
              <Box component="td" sx={{ width: '20px' }}>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <ActionIcon onClick={onEdit(experience.id)}>
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon onClick={onDelete(experience.id)} color="red">
                    <IconTrash />
                  </ActionIcon>
                </Box>
              </Box>
            </tr>
          ))}
        </tbody>
      </Table>
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
      <Table>
        <thead>
          <tr>
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>organization</th>
            <th>location</th>
            <th>startDate</th>
            <th>endDate</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educations.map((education, i) => (
            <tr key={education.id}>
              <td>{education.title}</td>
              <td>{education.titleJp}</td>
              <td>{education.body}</td>
              <td>{education.bodyJp}</td>
              <td>{education.organization}</td>
              <td>{education.location}</td>
              <td>{education.startDate}</td>
              <td>{education.endDate}</td>
              <Box component="td" sx={{ width: '20px' }}>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <ActionIcon onClick={onEdit(education.id)}>
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon onClick={onDelete(education.id)} color="red">
                    <IconTrash />
                  </ActionIcon>
                </Box>
              </Box>
            </tr>
          ))}
        </tbody>
      </Table>
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
      <Table>
        <thead>
          <tr>
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>link</th>
            <th>stacks</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {works.map((work, i) => (
            <tr key={i}>
              <td>{work.title}</td>
              <td>{work.titleJp}</td>
              <td>{work.body}</td>
              <td>{work.bodyJp}</td>
              <td>{work.link}</td>
              <td>stacks</td>
              <Box component="td" sx={{ width: '20px' }}>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <ActionIcon onClick={onEdit(work.id)}>
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon onClick={onDelete(work.id)} color="red">
                    <IconTrash />
                  </ActionIcon>
                </Box>
              </Box>
            </tr>
          ))}
        </tbody>
      </Table>
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
      <Table>
        <thead>
          <tr>
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr key={i}>
              <td>{project.title}</td>
              <td>{project.titleJp}</td>
              <td>{project.body}</td>
              <td>{project.bodyJp}</td>
              <td>{project.link}</td>
              <Box component="td" sx={{ width: '20px' }}>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <ActionIcon onClick={onEdit(project.id)}>
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon onClick={onDelete(project.id)} color="red">
                    <IconTrash />
                  </ActionIcon>
                </Box>
              </Box>
            </tr>
          ))}
        </tbody>
      </Table>
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
