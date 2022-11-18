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
  .header__profile-link {
    margin-top: 8px;
    text-align: center;
    color: ${COLOR['primary']};
  }
  .header__profile-sns-list {
    margin-top: 8px;
    display: flex;
    justify-content: space-evenly;
  }
  .header__profile-sns-item {
    position: relative;
    width: 100%;
    max-width: 24px;
    min-height: 24px;
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
    profile: { name, nameJp, snsInstagram, snsGithub },
  } = props;
  const displayName = `${name} / ${nameJp}`;
  return (
    <StyledHeader>
      <div className="header__container">
        <div className="header__back"></div>
        <div className="header__profile-container">
          <p className="header__profile-picture">
            <Image
              src="/assets/profile/profile.jpg"
              layout="fill"
              alt={displayName}
            />
          </p>
          <h1 className="header__profile-name">{displayName}</h1>
          <p className="header__profile-link">
            <a href={snsInstagram} rel="noreferrer noopener" target="_blunk">
              @eastasiann
            </a>
          </p>
          <ul className="header__profile-sns-list">
            <li className="header__profile-sns-item">
              <a href={snsGithub} rel="noreferrer noopener" target="_blunk">
                <Icon name="githubDark" layout="fill" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </StyledHeader>
  );
};
