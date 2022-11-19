import { FC, ReactNode, useEffect } from 'react';
import { Box, TextInput, Button, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { WorkInput } from '@admin/store';

import { BaseResumeFormProps } from './types';

type WorkFormProps = {
  workInput: WorkInput;
  children?: ReactNode;
} & BaseResumeFormProps;

export const WorkForm: FC<WorkFormProps> = (props) => {
  const { workInput, onSubmit, onCancel, children } = props;
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: workInput.title,
      titleJp: workInput.titleJp,
      body: workInput.body,
      bodyJp: workInput.bodyJp,
      link: workInput.link,
      github: workInput.github,
    },
  });

  useEffect(() => {
    reset({
      title: workInput.title,
      titleJp: workInput.titleJp,
      body: workInput.body,
      bodyJp: workInput.bodyJp,
      link: workInput.link,
      github: workInput.github,
    });
  }, [workInput]);

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
          label="github"
          name="github"
          placeholder="github"
          {...register('github')}
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
