import { FC, ReactNode, useEffect } from 'react';
import { Box, TextInput, Button, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { ProjectInput } from '@admin/store';

import { BaseResumeFormProps } from './types';
import { getDefaultDate } from '@admin/libs/date';

type ProjectFormProps = {
  projectInput: ProjectInput;
  children?: ReactNode;
} & BaseResumeFormProps;

export const ProjectForm: FC<ProjectFormProps> = (props) => {
  const { onSubmit, onCancel, projectInput, children } = props;
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: projectInput.title,
      titleJp: projectInput.titleJp,
      body: projectInput.body,
      bodyJp: projectInput.bodyJp,
      link: projectInput.link,
      startDate: getDefaultDate(projectInput.startDate),
      endDate: getDefaultDate(projectInput.endDate),
    },
  });

  useEffect(() => {
    reset({
      title: projectInput.title,
      titleJp: projectInput.titleJp,
      body: projectInput.body,
      bodyJp: projectInput.bodyJp,
      link: projectInput.link,
      startDate: getDefaultDate(projectInput.startDate),
      endDate: getDefaultDate(projectInput.endDate),
    });
  }, [projectInput]);

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
          label="link"
          name="link"
          placeholder="link"
          {...register('link')}
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
      {children}
      <Box sx={{ marginTop: '10px', display: 'flex' }}>
        <Button onClick={onCancel}>cancel</Button>
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};
