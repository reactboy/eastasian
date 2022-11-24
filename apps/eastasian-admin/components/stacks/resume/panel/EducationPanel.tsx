import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import {
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '@admin/api';
import { showNotification } from '@admin/libs/mantine';
import { useEducationInputStore } from '@admin/store';

import { PanelLayout } from '.';
import { FormModal, useFormModal, EducationForm } from './form';
import { EducationList } from './list';

export const EducationPanel = () => {
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
