import create from 'zustand';

export type WorkInput = {
  id: string;
  title: string;
  titleJp: string;
  body: string;
  bodyJp: string;
  link: string;
  stackIds: string[];
  github: string;
};

const initWorkInput = (): WorkInput => ({
  id: '',
  title: '',
  titleJp: '',
  body: '',
  bodyJp: '',
  link: '',
  stackIds: [],
  github: '',
});

type WorkState = {
  workInput: WorkInput;
  setWorkInput: (workInput: WorkInput) => void;
  resetWorkInput: () => void;
};

export const useWorkInputStore = create<WorkState>((set) => ({
  workInput: initWorkInput(),
  setWorkInput: (workInput: WorkInput) =>
    set((state) => ({ workInput: { ...state.workInput, ...workInput } })),
  resetWorkInput: () => set(() => ({ workInput: { ...initWorkInput() } })),
}));
