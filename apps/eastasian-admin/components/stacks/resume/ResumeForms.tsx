import { FC, useEffect } from 'react';
import { Box, TextInput, Button, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { StackInput, ExperienceInput, EducationInput } from '@admin/store';

const getDefaultDateInput = (date: string) => {
  return date ? format(new Date(date), 'yyyy-MM-dd') : '';
};

type BaseResumeFormProps = {
  onSubmit: (d) => Promise<void>;
  //TODO(eastasian) remove optional
  onCancel?: () => void;
};

export const AboutForm = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: '',
      nameJp: '',
      profileImage: '',
      description: '',
    },
  });
  const onSubmit = async (d) => {
    console.log(d);
  };
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
        <TextInput
          label="profileImage"
          name="profileImage"
          placeholder="profileImage"
          {...register('profileImage')}
        />
        <TextInput
          label="description"
          name="description"
          placeholder="about me"
          {...register('description')}
        />
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
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

export const WorkForm = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      title: '',
      titleJp: '',
      body: '',
      bodyJp: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
    },
  });
  const onSubmit = async (d) => {
    console.log(d);
  };
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
        <TextInput
          label="body"
          name="body"
          placeholder="body"
          {...register('body')}
        />
        <TextInput
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
          {...register('startDate')}
        />
        <TextInput
          label="endDate"
          name="endDate"
          placeholder="endDate"
          {...register('endDate')}
        />
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};

export const ProjectForm = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      title: '',
      titleJp: '',
      body: '',
      bodyJp: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
    },
  });
  const onSubmit = async (d) => {
    console.log(d);
  };
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
        <TextInput
          label="body"
          name="body"
          placeholder="body"
          {...register('body')}
        />
        <TextInput
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
          {...register('startDate')}
        />
        <TextInput
          label="endDate"
          name="endDate"
          placeholder="endDate"
          {...register('endDate')}
        />
      </Box>
      <Box sx={{ marginTop: '10px' }}>
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
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: stackInput.name,
      displayName: stackInput.displayName,
      link: stackInput.link,
    },
  });

  useEffect(() => {
    reset({
      ...stackInput,
    });
  }, [stackInput]);

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
