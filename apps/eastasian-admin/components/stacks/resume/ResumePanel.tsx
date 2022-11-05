import { ReactNode, FC, useEffect, useState } from 'react';
import { Tabs, Title, Box } from '@mantine/core';
import {
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  createStack,
  deleteStack,
  listStack,
  updateStack,
} from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useStackInputStore, useExperienceInputStore } from '@admin/store';

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
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resetExperienceInput, experienceInput, setExperienceInput } =
    useExperienceInputStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listExperience();
        setExperiences([...experiences, ...data.experiences]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  //NOTE(eastasian) initializing stack input form
  useEffect(() => {
    resetExperienceInput();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      const { data } = await createExperience({
        ...d,
        startDate: new Date(d.startDate).toISOString(),
        endDate: d.endDate ? new Date(d.endDate).toISOString() : null,
      });
      setExperiences((prevState) => [...prevState, data.experience]);
      showNotification({ message: 'experience created' });
      resetExperienceInput();
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateExperience(experienceInput.id, {
        ...d,
        startDate: new Date(d.startDate).toISOString(),
        endDate: d.endDate ? new Date(d.endDate).toISOString() : null,
      });
      setExperiences((prevExperiences) =>
        prevExperiences.map((experience) => {
          if (experience.id !== data.experience.id) return experience;
          return data.experience;
        })
      );
      showNotification({ message: 'experience updated' });
      resetExperienceInput();
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onEdit = (id: string) => () => {
    const experience = experiences.find((experience) => experience.id === id);
    setExperienceInput(experience);
  };

  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteExperience(id);
      setExperiences((prevExperiences) =>
        prevExperiences.filter((experience) => experience.id !== id)
      );
      showNotification({ message: 'experience deleted' });
      resetExperienceInput();
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onCancel = () => {
    resetExperienceInput();
  };

  return (
    <PanelLayout title="Experience">
      {experienceInput.id}
      <ExperienceForm
        experienceInput={experienceInput}
        onSubmit={experienceInput.id ? onSubmitEdit : onSubmitCreate}
        onCancel={onCancel}
      />
      <ExperienceList
        loading={loading}
        experiences={experiences}
        onEdit={onEdit}
        onDelete={onSubmitDelete}
      />
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
      const { data } = await createStack({ ...d });
      showNotification({ message: 'stack created' });
      setStacks((prevStacks) => [...prevStacks, data.stack]);
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
      resetStackInput();
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
