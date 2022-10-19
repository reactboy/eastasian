import styled from '@emotion/styled';

import { LanguageSwitch } from '@resume/components/common';
import { Header, Footer } from '@resume/components/layout';
import {
  AboutMe,
  WorkExperience,
  Education,
  Works,
  ExperiencedStacks,
} from '@resume/components/stack/resume';

const StyledPage = styled.div`
  .resume-content {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    margin-top: -20px;
    padding: 0 8px;
    & > *:not(:first-child) {
      margin-top: 24px;
    }
  }
  .language-switch-wrapper {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
`;

export function Index() {
  return (
    <StyledPage>
      <Header />
      <div className="language-switch-wrapper">
        <LanguageSwitch />
      </div>
      <div className="resume-content">
        <AboutMe />
        <WorkExperience />
        <Education />
        <Works />
        <ExperiencedStacks />
      </div>
      <Footer />
    </StyledPage>
  );
}

export default Index;
