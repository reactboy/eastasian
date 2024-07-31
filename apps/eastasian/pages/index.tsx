import { NextPage } from 'next';
import styled from '@emotion/styled';

import { LanguageSwitch } from '@resume/components/common';
import { Header, Footer } from '@resume/components/layout';
import {
  AboutMeSection,
  WorkExperienceSection,
  EducationSection,
  WorksSection,
  ExperiencedStacksSection,
  ProjectsSection,
} from '@resume/components/stack/resume';
import { readResume } from '@resume/api';
import { Resume } from '@resume/types';

const StyledPage = styled.div`
  .resume-content {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    margin-top: -20px;
    padding: 0 8px;
    & > *:not(:first-of-type) {
      margin-top: 24px;
    }
  }
  .language-switch-wrapper {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
`;

export const getStaticProps = async (_context) => {
  const profileId = process.env['PROFILE_ID'];
  try {
    const {
      data: { resume },
    } = await readResume(profileId);
    return {
      props: {
        resume,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: { error: error.message },
      revalidate: 10,
    };
  }
};

type Props = {
  resume: Resume;
  error?: string;
};

export const Index: NextPage<Props> = (props) => {
  const { resume, error } = props;

  if (error) return <>error</>;

  const { experiences, education, projects, works, stacks, ...profile } =
    resume;

  return (
    <StyledPage>
      <Header profile={profile} />
      <main className="resume-content">
        <AboutMeSection profile={profile} />
        <WorkExperienceSection experiences={experiences} />
        <EducationSection education={education} />
        <ProjectsSection projects={projects} />
        <WorksSection works={works} />
        <ExperiencedStacksSection stacks={stacks} />
      </main>
      <Footer />
      <div className="language-switch-wrapper">
        <LanguageSwitch />
      </div>
    </StyledPage>
  );
};

export default Index;
