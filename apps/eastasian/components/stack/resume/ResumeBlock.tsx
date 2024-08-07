import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

import { Stack, Icon } from '@resume/components/common';
import { COLOR } from '@resume/libs/styles';
import { useSelectLanguage } from '@resume/redux/selector';
import {
  Resume,
  Profile,
  Experience,
  Education,
  Project,
  Work,
  Stack as StackType,
} from '@resume/types';
import { formatDateText } from '@resume/libs/date';

const textPicker = <T,>(ln: 'en' | 'ja', obj: T, key: keyof T): string => {
  if (ln == 'en') return obj[`${String(key)}`];
  if (ln == 'ja') return obj[`${String(key)}Jp`];
  return '';
};

const StyledResumeBlock = styled.section`
  .resume-block__heading {
    color: ${COLOR['heading']};
    font-family: futura;
    font-style: italic;
    font-size: 24px;
  }
  .resume-block__container {
    margin-top: 24px;
    padding: 0 20px;
    & > *:not(:first-of-type) {
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
  & > *:not(:first-of-type) {
    margin-top: 8px;
  }
  p {
    white-space: pre-wrap;
    line-height: 1.4;
  }
`;

type AboutMeSectionProps = {
  profile: Profile;
};

export const AboutMeSection: FC<AboutMeSectionProps> = (props) => {
  const { profile } = props;
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="About Me">
      <StyledAboutMe>
        <p>{textPicker<typeof profile>(ln, profile, 'description')}</p>
      </StyledAboutMe>
    </ResumeBlock>
  );
};

const StyledExperiendCard = styled.div`
  .experience-card__title {
    color: ${COLOR['heading']};
    font-size: 20px;
    font-weight: 500;
  }
  .experience-card__info {
    color: ${COLOR['heading']};
    margin-top: 4px;
    font-size: 18px;
  }
  .experience-card__organization {
  }
  .experience-card__location {
  }
  .experience-card__date {
    color: ${COLOR['heading']};
    margin-top: 8px;
    font-size: 14px;
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
    font-size: 16px;
    line-height: 1.4;
    & > p {
      white-space: pre-wrap;
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
        <span className="experience-card__startDate">
          {formatDateText(startDate, 'yyyy')}
        </span>{' '}
        -{' '}
        <span
          className={`experience-card__endDate ${
            !endDate && 'experience-card__endDate--present'
          }`}
        >
          {endDate ? formatDateText(endDate, 'yyyy') : 'present'}
        </span>
      </p>
      <div className="experience-card__body">{children}</div>
    </StyledExperiendCard>
  );
};

type WorkExperienceSectionProps = {
  experiences: Experience[];
};

export const WorkExperienceSection: FC<WorkExperienceSectionProps> = (
  props
) => {
  const { experiences } = props;
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="Work Experience">
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
            <p>{textPicker<typeof experience>(ln, experience, 'body')}</p>
          </ExperienceCard>
        );
      })}
    </ResumeBlock>
  );
};

type EducationSectionProps = {
  education: Education[];
};

export const EducationSection: FC<EducationSectionProps> = (props) => {
  const { education } = props;
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="Education">
      {education.map((education, i) => {
        return (
          <ExperienceCard
            key={i}
            title={education.title}
            organization={education.organization}
            location={education.location}
            startDate={education.startDate}
            endDate={education.endDate}
          >
            <p>{textPicker<typeof education>(ln, education, 'body')}</p>
          </ExperienceCard>
        );
      })}
    </ResumeBlock>
  );
};

const StyledWorksCard = styled.div`
  padding: 8px;

  .works-card__header {
    display: flex;
    justify-content: space-between;
  }

  .works-card__title {
    color: ${COLOR['heading']};
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

  .works-card__date {
    color: ${COLOR['heading']};
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
    color: ${COLOR['sedondary']};
  }

  .works-card__body {
    font-size: 16px;
    margin-top: 8px;
    line-height: 1.4;
    & > p {
      white-space: pre-wrap;
    }
  }
  .works-card__stacks {
    display: flex;
    flex-wrap: wrap;
    padding-top: 16px;
    margin-left: -12px;
    margin-top: -8px;
  }

  .works-card__stack {
    margin-left: 12px;
    margin-top: 8px;
  }
`;

type WorksCardProps = {
  title: string;
  link?: string;
  stacks: StackType[];
  startDate?: string;
  endDate?: string;
  github?: string;
  children: ReactNode;
};

const WorksCard: FC<WorksCardProps> = (props) => {
  const { title, link, stacks, startDate, endDate, github, children } = props;

  return (
    <StyledWorksCard>
      <div className="works-card__header">
        <p className="works-card__title">
          <span>{title}</span>
          {!!link && (
            <a
              className="works-card__link"
              href={link}
              target="_blunk"
              rel="noopener norefferer"
            >
              <Icon name="linkDark" width="16" height="16" />
            </a>
          )}
        </p>
        {github && (
          <a href={github} target="_blunk" rel="noopener norefferer">
            <Icon name="githubDark" width="20" height="20" />
          </a>
        )}
      </div>
      {(startDate || endDate) && (
        <p className="works-card__date">
          <span className="works-card__startDate">
            {formatDateText(startDate, 'yyyy.MM')}
          </span>{' '}
          -{' '}
          <span
            className={`works-card__endDate ${
              !endDate && 'works-card__endDate--present'
            }`}
          >
            {endDate ? formatDateText(endDate, 'yyyy.MM') : 'present'}
          </span>
        </p>
      )}
      <div className="works-card__body">{children}</div>
      <ul className="works-card__stacks">
        {stacks.map((stack, i) => {
          return (
            <li key={i} className="works-card__stack">
              {stack.link ? (
                <a href={stack.link} target="_blunk" rel="noopener noreferrer">
                  <Stack
                    name={stack.name}
                    displayName={stack.displayName}
                    stackImage={stack.stackImage}
                  />
                </a>
              ) : (
                <Stack
                  name={stack.name}
                  displayName={stack.displayName}
                  stackImage={stack.stackImage}
                />
              )}
            </li>
          );
        })}
      </ul>
    </StyledWorksCard>
  );
};

type WorksSectionProps = {
  works: Work[];
};

export const WorksSection: FC<WorksSectionProps> = (props) => {
  const { works } = props;
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="Works">
      {works.map((work, i) => {
        return (
          <WorksCard
            key={i}
            title={textPicker<typeof work>(ln, work, 'title')}
            stacks={work.stacks}
            link={work.link}
            github={work.github}
          >
            <p>{textPicker<typeof work>(ln, work, 'body')}</p>
          </WorksCard>
        );
      })}
    </ResumeBlock>
  );
};

type ProjectsSectionProps = {
  projects: Project[];
};

export const ProjectsSection: FC<ProjectsSectionProps> = (props) => {
  const { projects } = props;
  const ln = useSelectLanguage();
  return (
    <ResumeBlock heading="Projects">
      {projects.map((project, i) => {
        return (
          <WorksCard
            key={i}
            title={textPicker<typeof project>(ln, project, 'title')}
            stacks={project.stacks}
            link={project.link}
            startDate={project.startDate}
            endDate={project.endDate}
          >
            <p>{textPicker<typeof project>(ln, project, 'body')}</p>
          </WorksCard>
        );
      })}
    </ResumeBlock>
  );
};

const StyledStacksCard = styled.div`
  .stacks-card__heading {
    color: ${COLOR['heading']};
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
  stacks: StackType[];
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
                  <Stack
                    name={stack.name}
                    displayName={stack.displayName}
                    stackImage={stack.stackImage}
                  />
                </a>
              ) : (
                <Stack
                  name={stack.name}
                  displayName={stack.displayName}
                  stackImage={stack.stackImage}
                />
              )}
            </li>
          );
        })}
      </ul>
    </StyledStacksCard>
  );
};

type ExperiencedStacksSectionProps = {
  stacks: Resume['stacks'];
};
export const ExperiencedStacksSection: FC<ExperiencedStacksSectionProps> = (
  props
) => {
  const {
    stacks: { production, sideProject },
  } = props;
  return (
    <ResumeBlock heading="Experienced Stacks">
      <StacksCard heading="Production" stacks={production} />
      <StacksCard heading="Side Project" stacks={sideProject} />
    </ResumeBlock>
  );
};
