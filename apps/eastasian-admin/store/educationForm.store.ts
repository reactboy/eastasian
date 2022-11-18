import create from 'zustand';

export type EducationInput = {
  id: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
};

const initEducationInput = (): EducationInput => ({
  id: '',
  title: '',
  titleJp: '',
  body: '',
  bodyJp: '',
  organization: '',
  location: '',
  startDate: '',
  endDate: '',
});

type EducationState = {
  educationInput: EducationInput;
  setEducationInput: (ExperienceInput: EducationInput) => void;
  resetEducationInput: () => void;
};

export const useEducationInputStore = create<EducationState>((set) => ({
  educationInput: initEducationInput(),
  setEducationInput: (educationInput: EducationInput) =>
    set((state) => ({
      educationInput: { ...state.educationInput, ...educationInput },
    })),
  resetEducationInput: () =>
    set(() => ({ educationInput: { ...initEducationInput() } })),
}));
