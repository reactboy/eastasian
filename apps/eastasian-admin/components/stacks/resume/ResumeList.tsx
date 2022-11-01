import { useEffect, useState } from 'react';
import { Avatar, Table, LoadingOverlay } from '@mantine/core';

import {
  listProfile,
  listExperience,
  listEducation,
  listWork,
  listProject,
  listStack,
} from '@admin/api';

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

export const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listExperience();
        setExperiences([...experiences, ...data.experiences]);
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
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>organization</th>
            <th>location</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience, i) => (
            <tr key={i}>
              <td>{experience.title}</td>
              <td>{experience.titleJp}</td>
              <td>{experience.body}</td>
              <td>{experience.bodyJp}</td>
              <td>{experience.organization}</td>
              <td>{experience.location}</td>
              <td>{experience.startDate}</td>
              <td>{experience.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export const EducationList = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listEducation();
        setEducations([...educations, ...data.educations]);
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
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>organization</th>
            <th>location</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((education, i) => (
            <tr key={i}>
              <td>{education.title}</td>
              <td>{education.titleJp}</td>
              <td>{education.body}</td>
              <td>{education.bodyJp}</td>
              <td>{education.organization}</td>
              <td>{education.location}</td>
              <td>{education.startDate}</td>
              <td>{education.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export const WorkList = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listWork();
        setWorks([...works, ...data.works]);
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
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>organization</th>
            <th>location</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work, i) => (
            <tr key={i}>
              <td>{work.title}</td>
              <td>{work.titleJp}</td>
              <td>{work.body}</td>
              <td>{work.bodyJp}</td>
              <td>{work.organization}</td>
              <td>{work.location}</td>
              <td>{work.startDate}</td>
              <td>{work.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export const ProjectList = () => {
  const [projects, setprojects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listProject();
        setprojects([...projects, ...data.projects]);
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
            <th>title</th>
            <th>titleJp</th>
            <th>body</th>
            <th>bodyJp</th>
            <th>organization</th>
            <th>location</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr key={i}>
              <td>{project.title}</td>
              <td>{project.titleJp}</td>
              <td>{project.body}</td>
              <td>{project.bodyJp}</td>
              <td>{project.organization}</td>
              <td>{project.location}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export const StackList = () => {
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listStack();
        setStacks([...stacks, ...data.stacks]);
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
            <th>icon</th>
            <th>name</th>
            <th>displayName</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          {stacks.map((stack, i) => {
            return (
              <tr key={i}>
                <td>
                  <Avatar />
                </td>
                <td>{stack.name}</td>
                <td>{stack.displayName}</td>
                <td>{stack.link}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
