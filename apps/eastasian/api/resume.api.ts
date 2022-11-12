import { axios } from '@resume/libs/axios';
import { Resume } from '@resume/types';

type ReadResumeResponse = {
  resume: Resume;
};

export const readResume = async (uid: string) => {
  try {
    return await axios.get<ReadResumeResponse>(`/resume/${uid}`);
  } catch (e) {
    console.log(e);
  }
};
