import { FC, ReactNode, ComponentProps } from 'react';
import styled from '@emotion/styled';

import { Stack, Icon } from '@resume/components/common';
import { COLOR } from '@resume/libs/styles';
import { useSelectLanguage } from '@resume/redux/selector';

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
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="About Me">
      <StyledAboutMe>
        {ln === 'ja' && (
          <>
            <p>
              東京出身のWebエンジニア。
              <br />
              2019年よりフロントエンドエンジニアとして多くのプロジェクトに参画し、主にUIの実装や機能実装を担当。
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
          </>
        )}
        {ln === 'en' && (
          <>
            <p>
              Web developer from Tokyo, Japan, participated in a lot of project
              as a front-end developer since 2019. mainly responsible for UI
              implementation and feature implementation.
            </p>
            <p>
              Specializes in frontend field, but also able to work with API
              implementation, DB design, etc... I will do whatever it takes to
              make a web application work.
            </p>
            <p>
              Currently, trying something other than web development, now
              teaching Japanese in Manila.
            </p>
          </>
        )}
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
    font-weight: 500;
    color: ${COLOR['sedondary']};
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

const experiences = [
  {
    title: 'Front Fullstack Developer',
    organization: 'Freelancing',
    location: 'BGC, Philippines',
    startDate: '2022',
    endDate: '',
    body: {
      en: [
        `undertakes the development of web applications and web-related consultation and correspondence necessary to move a business forward, primarily for individual business owners around me.`,
      ],
      ja: [
        `主に知り合いの個人事業主を中心に、事業を前進させるのに必要なWebアプリケーションの開発やWeb関連の相談、対応を請け負う。`,
      ],
    },
  },
  {
    title: 'Frontend Developer',
    organization: "Lei Hau'oli Co.,Ltd",
    location: 'Tokyo, Japan',
    startDate: '2019',
    endDate: '2021',
    body: {
      en: [
        `Worked as a front-end developer for several projects. As front-end
          developer, I was responsible for selecting client-side technologies,
          building the environment, developing coding rules for each project
          according to the level of each project member, code reviews, and
          function implementation. I always try to be responsible, play role
          to moving projects forward while maintaining a certain level of
          quality.`,
        `Beside the projects, I was also in charge of technical training for
          new graduates, devising a training program aimed at enabling them to
          implement CRUD using modern front-end frameworks and BaaS in two
          months from no prior experience.`,
      ],
      ja: [
        `フロントエンドエンジニアとして複数のプロジェクトの開発に携わる。
          プロジェクトではフロントエンドリードとしてクライアントサイドの技術選定から環境構築、
          プロジェクト毎にメンバーのレベルに合わせたコーディングルールの整備、コードレビューや機能実装を担当。一定水準の品質を維持した状態でプロジェクトを前進させるための役割を担う。`,
        `プロジェクトと並行して新卒の技術研修も担当。2ヶ月で未経験の状態からモダンフロントエンドのフレームワークとBaaSを使用してCRUDを実装できることを目的とした研修プログラムを考案。`,
      ],
    },
  },
];

export const WorkExperience = () => {
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="Work Experience">
      <>
        {experiences.map((experience, i) => {
          return (
            <ExperienceCard
              key={i}
              title={experience.title}
              organization={experience.organization}
              location={experience.location}
              startDate={experience.startDate}
              endDate={experience.endDate}
            >
              {experience.body[ln].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </ExperienceCard>
          );
        })}
      </>
    </ResumeBlock>
  );
};

export const Education = () => {
  const ln = useSelectLanguage();
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
          {ln === 'ja' && (
            <p>
              機械系の研究室に所属し、4脚歩行ロボットの高速歩行を目的とした脚機構を研究。
              大学3年次より長期休暇を利用しフィリピン・セブの貧困区域にて炊き出しを実施し、約2年間で計2000人の子どもにカレーやラーメンを配る。
            </p>
          )}
          {ln === 'en' && (
            <p>
              I belonged to a mechanical engineering laboratory, where I
              researched a leg mechanisms for high-speed walking of quadruped
              robots. In my third year of college, I started a soup kitchen in a
              poverty area in Cebu, Philippines during my long vacations. I go
              back to Cebu every long vacation and distributed curry and ramen
              noodles to a total of 2,000 children over a period of two years.
            </p>
          )}
        </ExperienceCard>
      </>
    </ResumeBlock>
  );
};

const StyledWorksCard = styled.div`
  padding: 8px;

  .works-card__title {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  .works-card__link {
    margin-left: 2px;
    display: flex;
    align-items: center;
  }

  .works-card__body {
    margin-top: 8px;
    font-weight: 100;
  }
  .works-card__stacks {
    display: flex;
    padding-top: 8px;
    margin-left: -12px;
  }

  .works-card__stack {
    margin-left: 12px;
  }
`;

type Stack = ComponentProps<typeof Stack>;

type WorksCardProps = {
  title: string;
  link?: string;
  stacks: Stack[];
  children: ReactNode;
};

const WorksCard: FC<WorksCardProps> = (props) => {
  const { title, link, stacks, children } = props;
  return (
    <StyledWorksCard>
      <p className="works-card__title">
        <span>{title}</span>
        {!!link && (
          <a
            className="works-card__link"
            href={link}
            target="_blunk"
            rel="noopener norefferer"
          >
            <Icon name="linkDark" width="16px" height="16px" />
          </a>
        )}
      </p>
      <div className="works-card__body">{children}</div>
      <ul className="works-card__stacks">
        {stacks.map((stack, i) => {
          return (
            <li key={i} className="works-card__stack">
              {stack.link ? (
                <a href={stack.link} target="_blunk" rel="noopener noreferrer">
                  <Stack name={stack.name} displayName={stack.displayName} />
                </a>
              ) : (
                <Stack name={stack.name} displayName={stack.displayName} />
              )}
            </li>
          );
        })}
      </ul>
    </StyledWorksCard>
  );
};

const works = [
  //   {
  //     title: 'Sallysally',
  //     body: 'Sallysally is a matching app which allow you to meet with a new people.',
  //     link: '',
  //     stacks: [
  //       { name: 'next', displayName: 'Next', link: '' },
  //       { name: 'blitz', displayName: 'blitz.js', link: '' },
  //       { name: 'prisma', displayName: 'prisma', link: '' },
  //       { name: 'typescript', displayName: 'Typescript', link: '' },
  //     ],
  //   },
  //   {
  //     title: 'Chot',
  //     body: 'Chot is a chat app which allow you to chat with a new people only for a one day.',
  //     link: '',
  //     stacks: [
  //       { name: 'next', displayName: 'Next', link: '' },
  //       { name: 'materialUi', displayName: 'MUI', link: '' },
  //       { name: 'supabase', displayName: 'supabse', link: '' },
  //       { name: 'prisma', displayName: 'prisma', link: '' },
  //       { name: 'typescript', displayName: 'Typescript', link: '' },
  //     ],
  //   },
  {
    title: 'kabchi',
    body: {
      ja: '',
      en: 'kabchi is a kind of diary app which allow you to manage your goals and daily progress of each goals easily and also it will help you review your actions toward goals by visualizing your actions by day.',
    },
    link: 'https://kabchi.vercel.app/',
    stacks: [
      { name: 'next', displayName: 'Next', link: '' },
      { name: 'chakra', displayName: 'Chakra', link: '' },
      { name: 'firebase', displayName: 'Firebase', link: '' },
      { name: 'graphql', displayName: 'graphql', link: '' },
      { name: 'hasura', displayName: 'hasura', link: '' },
      { name: 'redux', displayName: 'Redux', link: '' },
      { name: 'typescript', displayName: 'Typescript', link: '' },
    ],
  },
];

export const Works = () => {
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="Works">
      <>
        {works.map((work, i) => {
          return (
            <WorksCard
              key={i}
              title={work.title}
              stacks={work.stacks}
              link={work.link}
            >
              <p>{work.body[ln]}</p>
            </WorksCard>
          );
        })}
      </>
    </ResumeBlock>
  );
};

const StyledStacksCard = styled.div`
  .stacks-card__heading {
    font-size: 24px;
    font-style: italic;
  }

  .stacks-card__stacks {
    display: flex;
    flex-wrap: wrap;
    padding-top: 8px;
    margin-top: -8px;
  }
  .stacks-card__stack {
    margin-left: 12px;
    margin-top: 8px;
  }
`;

type StacksCardProps = {
  heading: string;
  stacks: Stack[];
};

const StacksCard: FC<StacksCardProps> = (props) => {
  const { heading, stacks } = props;
  return (
    <StyledStacksCard>
      <p className="stacks-card__heading">{heading}</p>
      <ul className="stacks-card__stacks">
        {stacks.map((stack, i) => {
          return (
            <li key={i} className="stacks-card__stack">
              {stack.link ? (
                <a href={stack.link} target="_blunk" rel="noopener noreferrer">
                  <Stack name={stack.name} displayName={stack.displayName} />
                </a>
              ) : (
                <Stack name={stack.name} displayName={stack.displayName} />
              )}
            </li>
          );
        })}
      </ul>
    </StyledStacksCard>
  );
};

const producationStacks = [
  { name: 'next', displayName: 'Next', link: '' },
  { name: 'lerna', displayName: 'lerna', link: '' },
  { name: 'react', displayName: 'React', link: '' },
  { name: 'vue', displayName: 'Vue', link: '' },
  { name: 'typescript', displayName: 'TypeScript', link: '' },
  { name: 'javascript', displayName: 'javaScript', link: '' },
  { name: 'jquery', displayName: 'jquery', link: '' },
  { name: 'node', displayName: 'node', link: '' },
  { name: 'mongodb', displayName: 'mongodb', link: '' },
  { name: 'capacitor', displayName: 'capacitor', link: '' },
  { name: 'graphql', displayName: 'graphql', link: '' },
  { name: 'apollo', displayName: 'apollo', link: '' },
  { name: 'materialUi', displayName: 'MUI', link: '' },
  { name: 'firebase', displayName: 'Firebase', link: '' },
  { name: 'html', displayName: 'html', link: '' },
  { name: 'css', displayName: 'css', link: '' },
  { name: 'sass', displayName: 'sass', link: '' },
  { name: 'git', displayName: 'git', link: '' },
  { name: 'gcp', displayName: 'GCP', link: '' },
  { name: 'figma', displayName: 'figma', link: '' },
  { name: 'xd', displayName: 'xd', link: '' },
  { name: 'photoshop', displayName: 'photoshop', link: '' },
  { name: 'illustrator', displayName: 'illustrator', link: '' },
  { name: 'jira', displayName: 'jira', link: '' },
  { name: 'tailwind', displayName: 'tailwind', link: '' },
  { name: 'semanticUi', displayName: 'semantic-ui', link: '' },
  { name: 'excel', displayName: 'Excel', link: '' },
  { name: 'spreadsheet', displayName: 'spreadsheet', link: '' },
];

const sideProjectStacks = [
  { name: 'nx', displayName: 'Nx', link: '' },
  { name: 'blitz', displayName: 'blitz.js', link: '' },
  { name: 'socketio', displayName: 'socket.io', link: 'https://socket.io/' },
  { name: 'django', displayName: 'Django', link: '' },
  { name: 'python', displayName: 'python', link: '' },
  { name: 'ruby', displayName: 'ruby', link: '' },
  { name: 'redis', displayName: 'redis', link: '' },
  { name: 'wordpress', displayName: 'wordpress', link: '' },
  { name: 'meteor', displayName: 'meteor', link: '' },
  { name: 'remix', displayName: 'Remix', link: '' },
  { name: 'fastify', displayName: 'fastify', link: '' },
  { name: 'gatsby', displayName: 'gatsby', link: '' },
  { name: 'deno', displayName: 'deno', link: '' },
  { name: 'prisma', displayName: 'prisma', link: '' },
  { name: 'supabase', displayName: 'supabase', link: '' },
  { name: 'amplify', displayName: 'Amplify', link: '' },
];

export const ExperiencedStacks = () => {
  return (
    <ResumeBlock heading="Experienced Stacks">
      <>
        <StacksCard heading="Production" stacks={producationStacks} />
        <StacksCard heading="Side Project" stacks={sideProjectStacks} />
      </>
    </ResumeBlock>
  );
};
