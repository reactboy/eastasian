import create from 'zustand';

export type ProjectInput = {
  id: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  link: string;
};

const initProjectInput = (): ProjectInput => ({
  id: '',
  title: '',
  titleJp: '',
  body: '',
  bodyJp: '',
  link: '',
});

type ProjectState = {
  projectInput: ProjectInput;
  setProjectInput: (projectInput: ProjectInput) => void;
  resetProjectInput: () => void;
};

export const useProjectInputStore = create<ProjectState>((set) => ({
  projectInput: initProjectInput(),
  setProjectInput: (projectInput: ProjectInput) =>
    set((state) => ({
      projectInput: { ...state.projectInput, ...projectInput },
    })),
  resetProjectInput: () =>
    set(() => ({ projectInput: { ...initProjectInput() } })),
}));
