import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import {
  listProject,
  createProject,
  updateProject,
  deleteProject,
} from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useProjectInputStore } from '@admin/store';

import { StackSelect, useStackSelect, PanelLayout } from '.';

import { FormModal, useFormModal, ProjectForm } from './form';

import { ProjectList } from './list';

export const ProjectsPanel = () => {
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
