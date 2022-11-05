import { ReactNode, FC, useEffect, useState } from 'react';
import { Tabs, Title, Box } from '@mantine/core';
import {
  createExperience,
  createStack,
  deleteStack,
  listStack,
  updateStack,
} from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useStackInputStore } from '@admin/store';

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
  const onSubmit = async (d) => {
    try {
      await createExperience({
        ...d,
        startDate: new Date(d.startDate).toISOString(),
        endDate: new Date(d.endDate).toISOString(),
      });
      showNotification({ message: 'experience created' });
    } catch (e) {
      console.log(e);
      showNotification({ message: e.message });
    }
  };
  return (
    <PanelLayout title="Experience">
      <ExperienceForm onSubmit={onSubmit} />
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
  const { setStackInput, stackInput, resetStackInput } = useStackInputStore(
    (state) => state
  );
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listStack();
        setStacks([...data.stacks]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  //NOTE(eastasian) initializing stack input form
  useEffect(() => {
    resetStackInput();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      await createStack({ ...d });
      showNotification({ message: 'stack created' });
      resetStackInput();
    } catch (e) {
      console.log(e);
      showNotification({ message: e.message });
    }
  };

  const onEdit = (id: string) => () => {
    const stack = stacks.find((stack) => stack.id === id);
    setStackInput(stack);
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateStack(stackInput.id, { ...d });
      setStacks((prevStacks) =>
        prevStacks.map((stack) => {
          if (data.stack.id !== stack.id) return stack;
          return data.stack;
        })
      );
      resetStackInput();
      showNotification({ message: 'stack updated' });
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteStack(id);
      setStacks((prevStacks) => prevStacks.filter((stack) => stack.id !== id));
      showNotification({ message: 'stack deleted' });
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onCancel = () => {
    resetStackInput();
  };

  return (
    <PanelLayout title="Stacks">
      <StackForm
        stackInput={stackInput}
        onSubmit={stackInput.id ? onSubmitEdit : onSubmitCreate}
        onCancel={onCancel}
      />
      <StackList
        onDelete={onSubmitDelete}
        onEdit={onEdit}
        stacks={stacks}
        loading={loading}
      />
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
