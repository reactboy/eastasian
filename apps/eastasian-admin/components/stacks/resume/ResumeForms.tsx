import { Box, TextInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';

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

export const ExperienceForm = () => {
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

export const EducationForm = () => {
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

export const StackForm = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: '',
      displayName: '',
      link: '',
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
      <Box sx={{ marginTop: '10px' }}>
        <Button sx={{ marginLeft: 'auto', display: 'block' }} type="submit">
          submit
        </Button>
      </Box>
    </form>
  );
};
