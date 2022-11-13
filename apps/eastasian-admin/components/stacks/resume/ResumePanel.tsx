import { ReactNode, FC, useEffect, useState } from 'react';
import { Tabs, Title, Box, Button } from '@mantine/core';
import {
  listProfile,
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
  updateProfile,
} from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import {
  useStackInputStore,
  useExperienceInputStore,
  useEducationInputStore,
  useWorkInputStore,
  useProjectInputStore,
  useProfileInputStore,
} from '@admin/store';
import { uploadFile } from '@admin/libs/supabase';

import {
  FormModal,
  useFormModal,
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
  StackSelect,
  useStackSelect,
} from '.';

const PanelLayout: FC<{
  title: string;
  children: ReactNode;
  headerSide?: ReactNode;
}> = (props) => {
  const { children, title, headerSide } = props;
  return (
    <Box sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title size="h2">{title}</Title>
        {headerSide && headerSide}
      </Box>
      <Box sx={{ padding: '8px 0' }}>{children}</Box>
    </Box>
  );
};

const AboutPanel = () => {
  const { profileInput, setProfileInput, resetProfileInput } =
    useProfileInputStore();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

  useEffect(() => {
    resetProfileInput();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await listProfile();
        setProfiles([...profiles, ...data.profiles]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const onSubmitEdit = async (d) => {
    try {
      const { profileImageFile, ...payload } = d;
      if (profileImageFile.length) {
        const file = profileImageFile[0];
        const publicUrl = await uploadFile('profiles', file);
        payload.profileImage = publicUrl;
      }
      const { data } = await updateProfile(profileInput.id, { ...payload });
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id !== data.profile.id ? profile : data.profile
        )
      );
      resetProfileInput();
      setIsFormModalOpen(false);
      showNotification({ message: 'profile updated' });
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onEdit = (id) => () => {
    const profile = profiles.find((profile) => profile.id === id);
    setProfileInput(profile);
    setIsFormModalOpen(true);
  };

  const onCancel = () => {
    resetProfileInput();
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout title="About">
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="About">
        <AboutForm
          profileInput={profileInput}
          onSubmit={onSubmitEdit}
          onCancel={onCancel}
        />
      </FormModal>
      <ProfileList profiles={profiles} loading={loading} onEdit={onEdit} />
    </PanelLayout>
  );
};

const ExperiencePanel = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resetExperienceInput, experienceInput, setExperienceInput } =
    useExperienceInputStore();
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

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
      setIsFormModalOpen(false);
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
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e.message });
    }
  };

  const onEdit = (id: string) => () => {
    const experience = experiences.find((experience) => experience.id === id);
    setExperienceInput(experience);
    setIsFormModalOpen(true);
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
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout
      title="Experience"
      headerSide={
        <Button onClick={() => setIsFormModalOpen(true)}>create</Button>
      }
    >
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="Experience">
        <ExperienceForm
          experienceInput={experienceInput}
          onSubmit={experienceInput.id ? onSubmitEdit : onSubmitCreate}
          onCancel={onCancel}
        />
      </FormModal>
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
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

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
      setIsFormModalOpen(false);
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
      setIsFormModalOpen(false);
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
    setIsFormModalOpen(true);
  };

  const onCancel = () => {
    resetEducationInput();
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout
      title="Education"
      headerSide={
        <Button onClick={() => setIsFormModalOpen(true)}>create</Button>
      }
    >
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="Education">
        <EducationForm
          educationInput={educationInput}
          onSubmit={educationInput.id ? onSubmitEdit : onSubmitCreate}
          onCancel={onCancel}
        />
      </FormModal>
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
  const { stacks, selectedStacks, onClickStack, initSelectedStack } =
    useStackSelect();
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

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
    initSelectedStack();
  }, []);

  const onSubmitCreate = async (d) => {
    try {
      const { data } = await createWork({ ...d, stackIds: selectedStacks });
      setWorks((prevWorks) => [...prevWorks, data.work]);
      showNotification({ message: 'work created' });
      resetWorkInput();
      initSelectedStack();
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateWork(workInput.id, {
        ...d,
        stackIds: selectedStacks,
        prevStackIds: workInput.stackIds,
      });
      setWorks((prevWorks) =>
        prevWorks.map((work) => (work.id !== data.work.id ? work : data.work))
      );
      showNotification({ message: 'work updated' });
      resetWorkInput();
      initSelectedStack();
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onEdit = (id: string) => () => {
    const work = works.find((work) => work.id === id);
    setWorkInput({ ...work, stackIds: work.stacks.map((stack) => stack.id) });
    initSelectedStack(work.stacks.map((stack) => stack.id));
    setIsFormModalOpen(true);
  };

  const onSubmitDelete = (id: string) => async () => {
    try {
      await deleteWork(id);
      setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
      showNotification({ message: 'work deleted' });
      resetWorkInput();
      initSelectedStack();
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onCancel = () => {
    resetWorkInput();
    initSelectedStack();
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout
      title="Works"
      headerSide={
        <Button onClick={() => setIsFormModalOpen(true)}>create</Button>
      }
    >
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="Work">
        <WorkForm
          workInput={workInput}
          onCancel={onCancel}
          onSubmit={workInput.id ? onSubmitEdit : onSubmitCreate}
        >
          <StackSelect
            stacks={stacks}
            onClickStack={onClickStack}
            selectedStacks={selectedStacks}
          />
        </WorkForm>
      </FormModal>
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
  const { stacks, selectedStacks, onClickStack, initSelectedStack } =
    useStackSelect();
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

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
      const { data } = await createProject({
        ...d,
        startDate: new Date(d.startDate).toISOString(),
        endDate: d.endDate ? new Date(d.endDate).toISOString() : null,
        stackIds: selectedStacks,
      });
      setprojects((prevProjects) => [...prevProjects, data.project]);
      showNotification({ message: 'project created' });
      resetProjectInput();
      initSelectedStack();
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onSubmitEdit = async (d) => {
    try {
      const { data } = await updateProject(projectInput.id, {
        ...d,
        startDate: new Date(d.startDate).toISOString(),
        endDate: d.endDate ? new Date(d.endDate).toISOString() : null,
        stackIds: selectedStacks,
        prevStackIds: projectInput.stackIds,
      });
      setprojects((prevProjects) =>
        prevProjects.map((project) =>
          project.id !== data.project.id ? project : data.project
        )
      );
      showNotification({ message: 'project updated' });
      resetProjectInput();
      initSelectedStack();
      setIsFormModalOpen(false);
    } catch (e) {
      showNotification({ message: e });
    }
  };

  const onEdit = (id: string) => () => {
    const project = projects.find((project) => project.id === id);
    setProjectInput({
      ...project,
      stackIds: project.stacks.map((stack) => stack.id),
    });
    initSelectedStack(project.stacks.map((stack) => stack.id));
    setIsFormModalOpen(true);
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
    initSelectedStack();
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout
      title="Projects"
      headerSide={
        <Button onClick={() => setIsFormModalOpen(true)}>create</Button>
      }
    >
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="Project">
        <ProjectForm
          projectInput={projectInput}
          onCancel={onCancel}
          onSubmit={projectInput.id ? onSubmitEdit : onSubmitCreate}
        >
          <StackSelect
            stacks={stacks}
            onClickStack={onClickStack}
            selectedStacks={selectedStacks}
          />
        </ProjectForm>
      </FormModal>
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
  const [isFormModalOpen, setIsFormModalOpen] = useFormModal();

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
      setIsFormModalOpen(false);
    } catch (e) {
      console.log(e);
      showNotification({ message: e.message });
    }
  };

  const onEdit = (id: string) => () => {
    const stack = stacks.find((stack) => stack.id === id);
    setStackInput(stack);
    setIsFormModalOpen(true);
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
      setIsFormModalOpen(false);
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
    setIsFormModalOpen(false);
  };

  return (
    <PanelLayout
      title="Stacks"
      headerSide={
        <Button onClick={() => setIsFormModalOpen(true)}>create</Button>
      }
    >
      <FormModal isOpen={isFormModalOpen} onClose={onCancel} title="stack">
        <StackForm
          stackInput={stackInput}
          onSubmit={stackInput.id ? onSubmitEdit : onSubmitCreate}
          onCancel={onCancel}
        />
      </FormModal>
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
