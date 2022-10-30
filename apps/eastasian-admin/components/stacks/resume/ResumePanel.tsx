import { Tabs, Title, Box } from '@mantine/core';

import {
  AboutForm,
  ExperienceForm,
  EducationForm,
  WorkForm,
  ProjectForm,
  StackForm,
} from '.';

export const ResumePanel = () => {
  return (
    <Tabs defaultValue="about" keepMounted={false}>
      <Tabs.List>
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="experience">Experience</Tabs.Tab>
        <Tabs.Tab value="education">Education</Tabs.Tab>
        <Tabs.Tab value="works">works</Tabs.Tab>
        <Tabs.Tab value="projects">projects</Tabs.Tab>
        <Tabs.Tab value="stacks">stacks</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about">
        <Title size="h2">About</Title>
        <Box>
          <AboutForm />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="experience">
        <Title size="h2">Experience</Title>
        <Box>
          <ExperienceForm />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="education">
        <Title size="h2">Education</Title>
        <Box>
          <EducationForm />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="works">
        <Title size="h2">Works</Title>
        <Box>
          <WorkForm />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="projects">
        <Title size="h2">Projects</Title>
        <Box>
          <ProjectForm />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="stacks">
        <Title size="h2">Stacks</Title>
        <Box>
          <StackForm />
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
};
