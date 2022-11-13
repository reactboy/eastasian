import { FC, ReactNode, useEffect, useState } from 'react';
import { Box, TextInput, Button, Textarea, Avatar } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import {
  StackInput,
  ExperienceInput,
  EducationInput,
  WorkInput,
  ProjectInput,
  ProfileInput,
} from '@admin/store';

//TODO(eastasian) extract to utils
const getDefaultDateInput = (date: string) => {
  return date ? format(new Date(date), 'yyyy-MM-dd') : '';
};

//TODO(eastasian) extract to utils
const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

type BaseResumeFormProps = {
  onSubmit: (d) => Promise<void>;
  onCancel: () => void;
};

type AboutFormProps = {
  profileInput: ProfileInput;
} & BaseResumeFormProps;

export const AboutForm: FC<AboutFormProps> = (props) => {
  const { profileInput, onSubmit, onCancel } = props;
  const [profileImage, setProfileImage] = useState<string>(
    profileInput.profileImage
  );

  console.log(profileInput, profileImage);

  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: {
      name: profileInput.name,
      nameJp: profileInput.nameJp,
      description: profileInput.description,
      descriptionJp: profileInput.descriptionJp,
      snsInstagram: profileInput.snsInstagram,
      snsGithub: profileInput.snsGithub,
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
    startDate: getDefaultDateInput(experienceInput.startDate),
    endDate: getDefaultDateInput(experienceInput.endDate),
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
        {experienceInput.id && <Button onClick={onCancel}>cancel</Button>}
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};

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
    startDate: getDefaultDateInput(educationInput.startDate),
    endDate: getDefaultDateInput(educationInput.endDate),
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
        {educationInput.id && <Button onClick={onCancel}>cancel</Button>}
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};

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
        {workInput.id && <Button onClick={onCancel}>cancel</Button>}
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};

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
      startDate: getDefaultDateInput(projectInput.startDate),
      endDate: getDefaultDateInput(projectInput.endDate),
    },
  });

  useEffect(() => {
    reset({
      title: projectInput.title,
      titleJp: projectInput.titleJp,
      body: projectInput.body,
      bodyJp: projectInput.bodyJp,
      link: projectInput.link,
      startDate: getDefaultDateInput(projectInput.startDate),
      endDate: getDefaultDateInput(projectInput.endDate),
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
        {projectInput.id && <Button onClick={onCancel}>cancel</Button>}
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};

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
        {stackInput.id && <Button onClick={onCancel}>cancel</Button>}
        <Button sx={{ marginLeft: 'auto' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};
