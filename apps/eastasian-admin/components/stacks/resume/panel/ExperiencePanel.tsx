import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import {
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useExperienceInputStore } from '@admin/store';

import { PanelLayout } from '.';
import { FormModal, useFormModal, ExperienceForm } from './form';
import { ExperienceList } from './list';

export const ExperiencePanel = () => {
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
