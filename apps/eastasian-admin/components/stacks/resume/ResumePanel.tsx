import { ReactNode, FC } from 'react';
import { Tabs, Title, Box } from '@mantine/core';

import {
  AboutForm,
  ExperienceForm,
  EducationForm,
  WorkForm,
  ProjectForm,
  StackForm,
  ProfileList,
  ExperienceList,
  EducationList,
  WorkList,
  ProjectList,
  StackList,
} from '.';

const PanelLayout: FC<{ title: string; children: ReactNode }> = (props) => {
  const { children, title } = props;
  return (
    <Box>
      <Title size="h2">{title}</Title>
      <Box>{children}</Box>
    </Box>
  );
};

const AboutPanel = () => {
  return (
    <PanelLayout title="About">
      <AboutForm />
      <ProfileList />
    </PanelLayout>
  );
};

const ExperiencePanel = () => {
  return (
    <PanelLayout title="Experience">
      <ExperienceForm />
      <ExperienceList />
    </PanelLayout>
  );
};

const EducationPanel = () => {
  return (
    <PanelLayout title="Education">
      <EducationForm />
      <EducationList />
    </PanelLayout>
  );
};

const WorksPanel = () => {
  return (
    <PanelLayout title="Works">
      <WorkForm />
      <WorkList />
    </PanelLayout>
  );
};

const ProjectsPanel = () => {
  return (
    <PanelLayout title="Projects">
      <ProjectForm />
      <ProjectList />
    </PanelLayout>
  );
};

const StacksPanel = () => {
  return (
    <PanelLayout title="Stacks">
      <StackForm />
      <StackList />
    </PanelLayout>
  );
};

const TAB = [
  {
    value: 'about',
    content: 'About',
  },
  {
    value: 'experience',
    content: 'Experience',
  },
  {
    value: 'education',
    content: 'Education',
  },
  {
    value: 'works',
    content: 'Works',
  },
  {
    value: 'projects',
    content: 'Projects',
  },
  {
    value: 'stacks',
    content: 'Stacks',
  },
];

const PANEL = [
  {
    value: 'about',
    Component: AboutPanel,
  },
  {
    value: 'experience',
    Component: ExperiencePanel,
  },
  {
    value: 'education',
    Component: EducationPanel,
  },
  {
    value: 'works',
    Component: WorksPanel,
  },
  {
    value: 'projects',
    Component: ProjectsPanel,
  },
  {
    value: 'stacks',
    Component: StacksPanel,
  },
];

export const ResumePanel = () => {
  return (
    <Tabs defaultValue={TAB[0]['value']} keepMounted={false}>
      <Tabs.List>
        {TAB.map((tab, i) => (
          <Tabs.Tab key={i} value={tab.value}>
            {tab.content}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {PANEL.map((panel, i) => (
        <Tabs.Panel key={i} value={panel.value}>
          <panel.Component />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
