import { FC, useEffect } from 'react';
import { Box, TextInput, Button, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { EducationInput } from '@admin/store';

import { getDefaultDate } from '@admin/libs/date';

import { BaseResumeFormProps } from './types';

type EducationFormProps = {
  educationInput: EducationInput;
} & BaseResumeFormProps;

export const EducationForm: FC<EducationFormProps> = (props) => {
  const { educationInput, onSubmit, onCancel } = props;

  const defaultValues = {
    title: educationInput.title,
    titleJp: educationInput.titleJp,
    body: educationInput.body,
    bodyJp: educationInput.bodyJp,
    organization: educationInput.organization,
    location: educationInput.location,
    startDate: getDefaultDate(educationInput.startDate),
    endDate: getDefaultDate(educationInput.endDate),
  };

  const { reset, handleSubmit, register } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [educationInput]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextInput
          label="title"
          name="title"
          placeholder="title"
          {...register('title')}
        />
        <TextInput
          label="titleJp"
          name="titleJp"
          placeholder="titleJp"
          {...register('titleJp')}
        />
        <Textarea
          label="body"
          name="body"
          placeholder="body"
          {...register('body')}
        />
        <Textarea
          label="bodyJp"
          name="bodyJp"
          placeholder="bodyJp"
          {...register('bodyJp')}
        />
        <TextInput
          label="organization"
          name="organization"
          placeholder="organization"
          {...register('organization')}
        />
        <TextInput
          label="location"
          name="location"
          placeholder="location"
          {...register('location')}
        />
        <TextInput
          label="startDate"
          name="startDate"
          placeholder="startDate"
          type="date"
          {...register('startDate')}
        />
        <TextInput
          label="endDate"
          name="endDate"
          placeholder="endDate"
          type="date"
          {...register('endDate')}
        />
      </Box>
      <Box sx={{ marginTop: '10px', display: 'flex' }}>
        <Button onClick={onCancel}>cancel</Button>
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};
