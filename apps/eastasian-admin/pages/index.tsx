import { useState } from 'react';
import styled from '@emotion/styled';
import { useCookies } from 'react-cookie';

import { axios } from '@admin/libs/axios';

const StyledPage = styled.div`
  .page {
  }
`;

export const Index = (props) => {
  const [_cookies, setCookie, removeCookie] = useCookies(['access', 'refresh']);
  const [profiles, setProifles] = useState(props.profiles);
  const [stacks, setStacks] = useState(props.stacks);
  const [stackInput, setStackInput] = useState({
    name: '',
    displayName: '',
    link: '',
  });
  const [profileInput, setProfileInput] = useState({
    email: '',
    password: '',
    name: '',
    nameJp: '',
    profileImage: '',
  });
  const [signinInput, setSigninInput] = useState({
    email: '',
    password: '',
  });

  const onChangeSigninInput = (key: keyof typeof signinInput) => (e) => {
    setSigninInput({
      ...signinInput,
      [key]: e.target.value,
    });
  };

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
    } = await axios.post(`/stacks`, {
      ...stackInput,
    });
    setStacks([...stacks, stack]);
  };

  const onSubmitProfile = async (e) => {
    e.preventDefault();
    const {
      data: { profile },
    } = await axios.post(`/auth/signup`, {
      ...profileInput,
    });
    setProifles([...profiles, profile]);
  };

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    const {
      data: { profile, authUser },
    } = await axios.post('/auth/signin', {
      ...signinInput,
    });
    console.log(profile, authUser);
    setCookie('access', authUser.session['access_token']);
    setCookie('refresh', authUser.session['refresh_token']);
  };

  const onClickRequestProfiles = async () => {
    const {
      data: { profiles },
    } = await axios.get('/profiles');
    console.log(profiles);
  };

  const onClickAuthorize = async () => {
    const response = await axios.post('/auth/authorize');
    console.log(response);
  };

  const onClickSignout = async () => {
    const response = await axios.post('/auth/signout');
    console.log(response);
    removeCookie('access');
    removeCookie('refresh');
  };

  return (
    <StyledPage>
      <h1>eastasian admin</h1>
      <div>
        <button onClick={onClickRequestProfiles}>get profiles</button>
      </div>
      <div>
        <button onClick={onClickAuthorize}>authorized</button>
      </div>
      <div>
        <button onClick={onClickSignout}>signout</button>
      </div>
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
        <form onSubmit={onSubmitSignin}>
          <h2>sign in</h2>
          <div>
            <input
              placeholder="email"
              value={signinInput.email}
              type="text"
              onChange={onChangeSigninInput('email')}
            />
          </div>
          <div>
            <input
              placeholder="password"
              value={signinInput.password}
              type="password"
              onChange={onChangeSigninInput('password')}
            />
          </div>
          <button type="submit">submit</button>
        </form>
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
              placeholder="email"
              value={profileInput.email}
              type="text"
              onChange={onChangeProfileInput('email')}
            />
          </div>
          <div>
            <input
              placeholder="password"
              value={profileInput.password}
              type="password"
              onChange={onChangeProfileInput('password')}
            />
          </div>
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
  } = await axios.get(`/profiles`);
  const {
    data: { stacks },
  } = await axios.get(`/stacks`);
  return {
    props: { profiles, stacks },
  };
};
