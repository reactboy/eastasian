import { ReactNode, FC, useEffect, useState } from 'react';
import { Tabs, Title, Box } from '@mantine/core';
import {
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  listWork,
  createWork,
  updateWork,
  deleteWork,
  listProject,
  createProject,
  updateProject,
  deleteProject,
  listStack,
  createStack,
  updateStack,
  deleteStack,
} from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import {
  useStackInputStore,
  useExperienceInputStore,
  useEducationInputStore,
  useWorkInputStore,
  useProjectInputStore,
} from '@admin/store';
import { uploadFile } from '@admin/libs/supabase';

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
        prevExperiences.map((experience) =>
          experience.id !== data.experience.id ? experience : data.experience
        )
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
  const { educationInput, setEducationInput, resetEducationInput } =
    useEducationInputStore((store) => store);
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listEducation();
        setEducations([...educations, ...data.educations]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    resetEducationInput();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      const { data } = await createEducation({
        ...d,
        startDate: new Date(d.startDate).toISOString(),
        endDate: d.endDate ? new Date(d.endDate).toISOString() : null,
      });
      setEducations((prevEducations) => [...prevEducations, data.education]);
      showNotification({ message: 'education created' });
      resetEducationInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateEducation(educationInput.id, {
        ...d,
        startDate: new Date(d.startDate).toISOString(),
        endDate: d.endDate ? new Date(d.endDate).toISOString() : null,
      });
      setEducations((prevEducations) =>
        prevEducations.map((education) =>
          data.education.id !== education.id ? education : data.education
        )
      );
      showNotification({ message: 'education updated' });
      resetEducationInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };
  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteEducation(id);
      setEducations((prevEducations) =>
        prevEducations.filter((education) => education.id !== id)
      );
      showNotification({ message: 'education deleted' });
      resetEducationInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onEdit = (id: string) => () => {
    const education = educations.find((education) => education.id === id);
    setEducationInput(education);
  };

  const onCancel = () => {
    resetEducationInput();
  };

  return (
    <PanelLayout title="Education">
      <EducationForm
        educationInput={educationInput}
        onSubmit={educationInput.id ? onSubmitEdit : onSubmitCreate}
        onCancel={onCancel}
      />
      <EducationList
        onDelete={onSubmitDelete}
        onEdit={onEdit}
        loading={loading}
        educations={educations}
      />
    </PanelLayout>
  );
};

const WorksPanel = () => {
  const { workInput, setWorkInput, resetWorkInput } = useWorkInputStore(
    (store) => store
  );
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listWork();
        setWorks([...works, ...data.works]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    resetWorkInput();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      const { data } = await createWork({ ...d });
      setWorks((prevWorks) => [...prevWorks, data.work]);
      showNotification({ message: 'work created' });
      resetWorkInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateWork(workInput.id, { ...d });
      setWorks((prevWorks) =>
        prevWorks.map((work) => (work.id !== data.work.id ? work : data.work))
      );
      showNotification({ message: 'work updated' });
      resetWorkInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onEdit = (id: string) => () => {
    const work = works.find((work) => work.id === id);
    setWorkInput(work);
  };

  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteWork(id);
      setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
      showNotification({ message: 'work deleted' });
      resetWorkInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onCancel = () => {
    resetWorkInput();
  };

  return (
    <PanelLayout title="Works">
      <WorkForm
        workInput={workInput}
        onCancel={onCancel}
        onSubmit={workInput.id ? onSubmitEdit : onSubmitCreate}
      />
      <WorkList
        onEdit={onEdit}
        onDelete={onSubmitDelete}
        works={works}
        loading={loading}
      />
    </PanelLayout>
  );
};

const ProjectsPanel = () => {
  const { projectInput, setProjectInput, resetProjectInput } =
    useProjectInputStore((store) => store);
  const [projects, setprojects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listProject();
        setprojects([...projects, ...data.projects]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    resetProjectInput();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      const { data } = await createProject({ ...d });
      setprojects((prevProjects) => [...prevProjects, data.project]);
      showNotification({ message: 'project created' });
      resetProjectInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateProject(projectInput.id, { ...d });
      setprojects((prevProjects) =>
        prevProjects.map((project) =>
          project.id !== data.project.id ? project : data.project
        )
      );
      showNotification({ message: 'project updated' });
      resetProjectInput();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onEdit = (id: string) => () => {
    const project = projects.find((project) => project.id === id);
    setProjectInput(project);
  };

  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteProject(id);
      setprojects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      showNotification({ message: 'project deleted' });
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onCancel = () => {
    resetProjectInput();
  };

  return (
    <PanelLayout title="Projects">
      <ProjectForm
        projectInput={projectInput}
        onCancel={onCancel}
        onSubmit={projectInput.id ? onSubmitEdit : onSubmitCreate}
      />
      <ProjectList
        projects={projects}
        loading={loading}
        onDelete={onSubmitDelete}
        onEdit={onEdit}
      />
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
      const { icon, ...payload } = d;

      if (icon.length) {
        const file = icon[0];
        const publicUrl = await uploadFile('stacks', file);
        payload.stackImage = publicUrl;
      }

      const { data } = await createStack(payload);
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
      const { icon, ...payload } = d;

      if (icon.length) {
        const file = icon[0];
        const publicUrl = await uploadFile('stacks', file);
        payload.stackImage = publicUrl;
      }

      const { data } = await updateStack(stackInput.id, { ...payload });
      setStacks((prevStacks) =>
        prevStacks.map((stack) =>
          data.stack.id !== stack.id ? stack : data.stack
        )
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
