import { useEffect, useState } from 'react';
import { Avatar, Table, LoadingOverlay } from '@mantine/core';

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

export const ExperienceList = () => {
  return (
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
        <tr>
          <td>title</td>
          <td>titleJp</td>
          <td>body</td>
          <td>bodyJp</td>
          <td>organization</td>
          <td>location</td>
          <td>startDate</td>
          <td>endDate</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const EducationList = () => {
  return (
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
        <tr>
          <td>title</td>
          <td>titleJp</td>
          <td>body</td>
          <td>bodyJp</td>
          <td>organization</td>
          <td>location</td>
          <td>startDate</td>
          <td>endDate</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const WorkList = () => {
  return (
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
        <tr>
          <td>title</td>
          <td>titleJp</td>
          <td>body</td>
          <td>bodyJp</td>
          <td>organization</td>
          <td>location</td>
          <td>startDate</td>
          <td>endDate</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const ProjectList = () => {
  return (
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
        <tr>
          <td>title</td>
          <td>titleJp</td>
          <td>body</td>
          <td>bodyJp</td>
          <td>organization</td>
          <td>location</td>
          <td>startDate</td>
          <td>endDate</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const StackList = () => {
  return (
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
        <tr>
          <td>
            <Avatar />
          </td>
          <td>name</td>
          <td>displayName</td>
          <td>link</td>
        </tr>
      </tbody>
    </Table>
  );
};
