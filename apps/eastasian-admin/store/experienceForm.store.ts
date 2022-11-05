import create from 'zustand';

export type ExperienceInput = {
  id: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: '';
};

const initExperienceInput = (): ExperienceInput => ({
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

type ExperienceState = {
  experienceInput: ExperienceInput;
  setExperienceInput: (ExperienceInput: ExperienceInput) => void;
  resetExperienceInput: () => void;
};

export const useExperienceInputStore = create<ExperienceState>((set) => ({
  experienceInput: initExperienceInput(),
  setExperienceInput: (experienceInput: ExperienceInput) =>
    set((state) => ({
      experienceInput: { ...state.experienceInput, ...experienceInput },
    })),
  resetExperienceInput: () =>
    set(() => ({ experienceInput: { ...initExperienceInput() } })),
}));
