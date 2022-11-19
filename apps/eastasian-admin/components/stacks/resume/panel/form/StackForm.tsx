import { FC, useEffect, useState } from 'react';
import { Box, TextInput, Button, Avatar } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { StackInput } from '@admin/store';

import { convertBase64 } from '@admin/libs/file';

import { BaseResumeFormProps } from './types';

type StackFormProps = { stackInput: StackInput } & BaseResumeFormProps;

export const StackForm: FC<StackFormProps> = (props) => {
  const { onSubmit, stackInput, onCancel } = props;
  const [stackImage, setStackImage] = useState<string>(stackInput.stackImage);

  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: {
      name: stackInput.name,
      displayName: stackInput.displayName,
      link: stackInput.link,
      icon: [],
    },
  });

  useEffect(() => {
    reset({
      name: stackInput.name,
      displayName: stackInput.displayName,
      link: stackInput.link,
      icon: [],
    });
    setStackImage(stackInput.stackImage);
  }, [stackInput]);

  useEffect(() => {
    const subscription = watch(async (value, { name }) => {
      if (name !== 'icon') return;
      if (!value.icon.length) return;
      const file = value.icon[0];
      const base64 = (await convertBase64(file)) as string;
      setStackImage(base64);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextInput
          label="name"
          name="name"
          placeholder="name"
          {...register('name')}
        />
        <TextInput
          label="displayName"
          name="displayName"
          placeholder="displayName"
          {...register('displayName')}
        />
        <TextInput
          label="link"
          name="link"
          placeholder="link"
          {...register('link')}
        />
        <Box>
          <TextInput
            label="icon"
            type="file"
            name="icon"
            {...register('icon')}
          />
          <Avatar src={stackImage} sx={{ img: { objectFit: 'contain' } }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <Button onClick={onCancel}>cancel</Button>
        <Button sx={{ marginLeft: 'auto' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};
