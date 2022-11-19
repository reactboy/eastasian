import { FC, useEffect } from 'react';
import { Box, TextInput, Button, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { ExperienceInput } from '@admin/store';

import { getDefaultDate } from '@admin/libs/date';

import { BaseResumeFormProps } from './types';

type ExperienceFormProps = {
  experienceInput: ExperienceInput;
} & BaseResumeFormProps;

export const ExperienceForm: FC<ExperienceFormProps> = (props) => {
  const { onSubmit, experienceInput, onCancel } = props;

  const defaultValues = {
    title: experienceInput.title,
    titleJp: experienceInput.titleJp,
    body: experienceInput.body,
    bodyJp: experienceInput.bodyJp,
    organization: experienceInput.organization,
    location: experienceInput.location,
    startDate: getDefaultDate(experienceInput.startDate),
    endDate: getDefaultDate(experienceInput.endDate),
  };

  const { reset, handleSubmit, register } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [experienceInput]);

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
          type="date"
          placeholder="startDate"
          {...register('startDate')}
        />
        <TextInput
          label="endDate"
          name="endDate"
          type="date"
          placeholder="endDate"
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
