import { FC, useEffect, useState } from 'react';
import { Box, TextInput, Button, Textarea, Avatar } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { ProfileInput } from '@admin/store';

import { convertBase64 } from '@admin/libs/file';

import { BaseResumeFormProps } from './types';

type AboutFormProps = {
  profileInput: ProfileInput;
} & BaseResumeFormProps;

export const AboutForm: FC<AboutFormProps> = (props) => {
  const { profileInput, onSubmit, onCancel } = props;
  const [profileImage, setProfileImage] = useState<string>(
    profileInput.profileImage
  );

  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: {
      name: profileInput.name,
      nameJp: profileInput.nameJp,
      description: profileInput.description,
      descriptionJp: profileInput.descriptionJp,
      snsInstagram: profileInput.snsInstagram,
      snsGithub: profileInput.snsGithub,
      snsLinkedin: profileInput.snsLinkedin,
      profileImageFile: [],
    },
  });

  useEffect(() => {
    reset({
      name: profileInput.name,
      nameJp: profileInput.nameJp,
      description: profileInput.description,
      descriptionJp: profileInput.descriptionJp,
      snsInstagram: profileInput.snsInstagram,
      snsGithub: profileInput.snsGithub,
      snsLinkedin: profileInput.snsLinkedin,
      profileImageFile: [],
    });
    setProfileImage(profileInput.profileImage);
  }, [profileInput]);

  useEffect(() => {
    const subscription = watch(async (value, { name }) => {
      if (name !== 'profileImageFile') return;
      if (!value.profileImageFile.length) return;
      const file = value.profileImageFile[0];
      const base64 = (await convertBase64(file)) as string;
      setProfileImage(base64);
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
          label="nameJp"
          name="nameJp"
          placeholder="nameJp"
          {...register('nameJp')}
        />
        <Textarea
          label="description"
          name="description"
          placeholder="about me"
          {...register('description')}
        />
        <Textarea
          label="descriptionJp"
          name="descriptionJp"
          placeholder="about me"
          {...register('descriptionJp')}
        />
        <TextInput
          label="github"
          name="snsGithub"
          placeholder="github"
          {...register('snsGithub')}
        />
        <TextInput
          label="instagram"
          name="snsInstagram"
          placeholder="instagram"
          {...register('snsInstagram')}
        />
        <TextInput
          label="linkedin"
          name="snsLinkedin"
          placeholder="linkedin"
          {...register('snsLinkedin')}
        />
        <TextInput
          label="profileImage"
          name="profileImageFile"
          placeholder="profileImage"
          type="file"
          {...register('profileImageFile')}
        />
        <Avatar src={profileImage} sx={{ img: { objectFit: 'contain' } }} />
      </Box>
      <Box sx={{ marginTop: '10px', display: 'flex' }}>
        {profileInput.id && <Button onClick={onCancel}>cancel</Button>}
        {profileInput.id && (
          <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
            submit
          </Button>
        )}
      </Box>
    </form>
  );
};
