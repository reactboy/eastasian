import { FC } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { Icon } from '@resume/components/common';
import { COLOR } from '@resume/libs/styles';
import { Profile } from '@resume/types';

const StyledHeader = styled.header`
  .header__container {
    position: relative;
  }
  .header__back {
    background: ${COLOR['primary']};
    min-height: 100px;
  }
  .header__profile-container {
    transform: translateY(-20%);
  }
  .header__profile-picture {
    position: relative;
    width: 100%;
    max-width: 120px;
    min-height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    img {
      object-fit: center;
    }
  }
  .header__profile-name {
    text-align: center;
    margin-top: 16px;
    font-size: 24px;
  }
  .header__profile-sns-list {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  .header__profile-sns-item {
    position: relative;
    width: 100%;
    max-width: 20px;
    min-height: 20px;
    img {
      object-fit: contain;
    }
  }
`;

type HeaderProps = {
  profile: Profile;
};

export const Header: FC<HeaderProps> = (props) => {
  const {
    profile: {
      name,
      nameJp,
      snsLinkedin,
      snsInstagram,
      snsGithub,
      profileImage,
    },
  } = props;
  const displayName = `${name} / ${nameJp}`;
  return (
    <StyledHeader>
      <div className="header__container">
        <div className="header__back"></div>
        <div className="header__profile-container">
          <p className="header__profile-picture">
            <Image src={profileImage} layout="fill" alt={displayName} />
          </p>
          <h1 className="header__profile-name">{displayName}</h1>
          <ul className="header__profile-sns-list">
            {snsLinkedin && (
              <li className="header__profile-sns-item">
                <a href={snsLinkedin} rel="noreferrer noopener" target="_blunk">
                  <Icon name="linkedinDark" layout="fill" />
                </a>
              </li>
            )}
            {snsGithub && (
              <li className="header__profile-sns-item">
                <a href={snsGithub} rel="noreferrer noopener" target="_blunk">
                  <Icon name="githubDark" layout="fill" />
                </a>
              </li>
            )}
            {snsInstagram && (
              <li className="header__profile-sns-item">
                <a
                  href={snsInstagram}
                  rel="noreferrer noopener"
                  target="_blunk"
                >
                  <Icon name="instagramDark" layout="fill" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </StyledHeader>
  );
};
