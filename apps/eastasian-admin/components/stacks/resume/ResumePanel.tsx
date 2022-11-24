import { Tabs } from '@mantine/core';

import {
  AboutPanel,
  ExperiencePanel,
  EducationPanel,
  WorksPanel,
  ProjectsPanel,
  StacksPanel,
} from './panel';

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
