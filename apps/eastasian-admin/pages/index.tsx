import { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

const axiosInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_HOST'],
});

const StyledPage = styled.div`
  .page {
  }
`;

export const Index = (props) => {
  const [profiles, setProifles] = useState(props.profiles);
  const [stacks, setStacks] = useState(props.stacks);
  const [stackInput, setStackInput] = useState({
    name: '',
    displayName: '',
    link: '',
  });
  const [profileInput, setProfileInput] = useState({
    name: '',
    nameJp: '',
    profileImage: '',
  });

  const onChangeStackInput = (key: keyof typeof stackInput) => (e) => {
    setStackInput({
      ...stackInput,
      [key]: e.target.value,
    });
  };

  const onChangeProfileInput = (key: keyof typeof profileInput) => (e) => {
    setProfileInput({
      ...profileInput,
      [key]: e.target.value,
    });
  };

  const onSubmitStack = async (e) => {
    e.preventDefault();
    const {
      data: { stack },
    } = await axiosInstance.post(`/stacks`, {
      ...stackInput,
    });
    setStacks([...stacks, stack]);
  };

  const onSubmitProfile = async (e) => {
    e.preventDefault();
    const {
      data: { profile },
    } = await axiosInstance.post(`/profiles`, {
      ...profileInput,
    });
    setProifles([...profiles, profile]);
  };

  return (
    <StyledPage>
      <h1>eastasian admin</h1>
      <ul>
        {profiles.map((profile, i) => {
          return <li key={i}>{profile.name}</li>;
        })}
      </ul>
      <ul>
        {stacks.map((stack, i) => {
          return <li key={i}>{stack.name}</li>;
        })}
      </ul>
      <div>
        <form onSubmit={onSubmitStack}>
          <h2>stack create</h2>
          <div>
            <input
              placeholder="name"
              value={stackInput.name}
              type="text"
              onChange={onChangeStackInput('name')}
            />
          </div>
          <div>
            <input
              placeholder="displayName"
              value={stackInput.displayName}
              type="text"
              onChange={onChangeStackInput('displayName')}
            />
          </div>
          <div>
            <input
              placeholder="link"
              value={stackInput.link}
              type="text"
              onChange={onChangeStackInput('link')}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>

      <div>
        <h2>profile create</h2>
        <form onSubmit={onSubmitProfile}>
          <div>
            <input
              placeholder="name"
              value={profileInput.name}
              type="text"
              onChange={onChangeProfileInput('name')}
            />
          </div>
          <div>
            <input
              placeholder="nameJp"
              value={profileInput.nameJp}
              type="text"
              onChange={onChangeProfileInput('nameJp')}
            />
          </div>
          <div>
            <input
              placeholder="profileImage"
              value={profileInput.profileImage}
              type="text"
              onChange={onChangeProfileInput('profileImage')}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </StyledPage>
  );
};

export default Index;

export const getServerSideProps = async (_context) => {
  const {
    data: { profiles },
  } = await axiosInstance.get(`/profiles`);
  const {
    data: { stacks },
  } = await axiosInstance.get(`/stacks`);
  return {
    props: { profiles, stacks },
  };
};
