export type Profile = {
  id: string;
  profileImage: string;
  name: string;
  nameJp: string;
  description: string;
  descriptionJp: string;
  createdAt: string;
  updatedAt: string;
  snsGithub: string;
  snsInstagram: string;
};

export type Experience = {
  id: string;
  profileId: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Education = {
  id: string;
  profileId: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  startDate: string;
  endDate: string | null;
  location: string;
  organization: string;
  createdAt: string;
  updatedAt: string;
};

export type Stack = {
  id: string;
  name: string;
  displayName: string;
  link: string;
  stackImage: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  profileId: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  link: string;
  startDate: string;
  endDate: string | null;
  stacks: Stack[];
  createdAt: string;
  updatedAt: string;
};

export type Work = {
  id: string;
  profileId: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  link: string;
  github: string;
  stacks: Stack[];
  createdAt: string;
  updatedAt: string;
};

export type Resume = Profile & {
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  works: Work[];
  stacks: { production: Stack[]; sideProject: Stack[] };
};
