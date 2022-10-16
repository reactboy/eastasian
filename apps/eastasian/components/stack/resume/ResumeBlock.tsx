import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

import { COLOR } from '@resume/libs/styles';

//TODO(eastasian) 内容を直打ちじゃなくてDBから取得するようにする

const StyledResumeBlock = styled.section`
  .resume-block__heading {
    font-family: futura;
    font-style: italic;
    font-size: 24px;
  }
  .resume-block__container {
    margin-top: 24px;
    padding: 0 20px;
    & > *:not(:first-child) {
      margin-top: 20px;
    }
  }
`;

type ResumeBlockProps = {
  heading: string;
  children: ReactNode;
};

export const ResumeBlock: FC<ResumeBlockProps> = (props) => {
  const { heading, children } = props;

  return (
    <StyledResumeBlock>
      <h1 className="resume-block__heading">{heading}</h1>
      <div className="resume-block__container">{children}</div>
    </StyledResumeBlock>
  );
};

const StyledAboutMe = styled.div`
  & > *:not(:first-child) {
    margin-top: 8px;
  }
  p {
    font-weight: 100;
  }
`;

export const AboutMe = () => {
  return (
    <ResumeBlock heading="About Me">
      <StyledAboutMe>
        <p>
          東京出身のWebエンジニア。
          <br />
          2019年よりフロントエンドエンジニアとして多くのプロジェクトに参画し、主にUIの実装や機能実装を主に担当。
        </p>
        <p>
          フロント領域が専門だが、 API実装やDB設計など
          <br />
          Webアプリケーションを動かすのに必要なことは何でもやる。
        </p>
        <p>
          現在はエンジニア以外の仕事に挑戦してみたいと思い、
          <br />
          マニラにて日本語を教えている
        </p>
      </StyledAboutMe>
    </ResumeBlock>
  );
};

const StyledExperiendCard = styled.div`
  .experience-card__title {
    font-size: 20px;
    font-weight: 500;
  }
  .experience-card__info {
    margin-top: 4px;
    font-size: 18px;
  }
  .experience-card__organization {
  }
  .experience-card__location {
  }
  .experience-card__date {
    margin-top: 8px;
    font-size: 16px;
  }
  .experience-card__startDate {
  }
  .experience-card__endDate {
    &--present {
      color: ${COLOR['primary']};
    }
  }
  .experience-card__body {
    margin-top: 8px;
    font-weight: 100;
    font-size: 18px;
    & > p:not(:first-child) {
      margin-top: 8px;
    }
  }
`;

type ExperienceCardProps = {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  children: ReactNode;
};

const ExperienceCard: FC<ExperienceCardProps> = (props) => {
  const { title, organization, location, startDate, endDate, children } = props;
  return (
    <StyledExperiendCard>
      <p className="experience-card__title">{title}</p>
      <p className="experience-card__info">
        <span className="experience-card__company">{organization}</span> -{' '}
        <span className="experience-card__location ">{location}</span>
      </p>
      <p className="experience-card__date">
        <span className="experience-card__startDate">{startDate}</span> -{' '}
        <span
          className={`experience-card__endDate ${
            !endDate && 'experience-card__endDate--present'
          }`}
        >
          {endDate ? endDate : 'present'}
        </span>
      </p>
      <div className="experience-card__body">{children}</div>
    </StyledExperiendCard>
  );
};

export const WorkExperience = () => {
  return (
    <ResumeBlock heading="Work Experience">
      <>
        <ExperienceCard
          title="Front Fullstack Developer"
          organization="Freelancing"
          location="BGC, Philippines"
          startDate="2022"
        >
          <p>
            Beside the projects, I was also in charge of technical training for
            new graduates, devising a training program aimed at enabling them to
            implement CRUD using modern front-end frameworks and BaaS in two
            months from no prior experience.
          </p>
        </ExperienceCard>
        <ExperienceCard
          title="Frontend Developer"
          organization="Lei Hau'oli Co.,Ltd"
          location="Tokyo, Japan"
          startDate="2019"
          endDate="2021"
        >
          <p>
            Worked as a front-end developer for several projects. As front-end
            developer, I was responsible for selecting client-side technologies,
            building the environment, developing coding rules for each project
            according to the level of each project member, code reviews, and
            function implementation. I always try to be responsible, play role
            to moving projects forward while maintaining a certain level of
            quality.
          </p>
          <p>
            Beside the projects, I was also in charge of technical training for
            new graduates, devising a training program aimed at enabling them to
            implement CRUD using modern front-end frameworks and BaaS in two
            months from no prior experience.
          </p>
        </ExperienceCard>
      </>
    </ResumeBlock>
  );
};

export const Education = () => {
  return (
    <ResumeBlock heading="Education">
      <>
        <ExperienceCard
          title="Bachelor in Engineering"
          organization="Tamagawa Univ"
          location="Tokyo, Japan"
          startDate="2015"
          endDate="2019"
        >
          <p>
            Worked as a front-end developer for several projects. As front-end
            developer, I was responsible for selecting client-side technologies,
            building the environment, developing coding rules for each project
            according to the level of each project member, code reviews, and
            function implementation. I always try to be responsible, play role
            to moving projects forward while maintaining a certain level of
            quality.
          </p>
        </ExperienceCard>
      </>
    </ResumeBlock>
  );
};

export const Works = () => {
  return (
    <ResumeBlock heading="Works">
      <>
        <div>block</div>
        <div>block</div>
      </>
    </ResumeBlock>
  );
};

export const ExperiencedStacks = () => {
  return (
    <ResumeBlock heading="Experienced Stacks">
      <>
        <div>block</div>
        <div>block</div>
      </>
    </ResumeBlock>
  );
};
