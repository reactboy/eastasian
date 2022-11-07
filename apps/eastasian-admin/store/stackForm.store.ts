import create from 'zustand';

export type StackInput = {
  id: string;
  name: string;
  displayName: string;
  link: string;
  stackImage: '';
};

const initStackInput = (): StackInput => ({
  id: '',
  name: '',
  displayName: '',
  link: '',
  stackImage: '',
});

type StackState = {
  stackInput: StackInput;
  setStackInput: (stackInput: StackInput) => void;
  resetStackInput: () => void;
};

export const useStackInputStore = create<StackState>((set) => ({
  stackInput: initStackInput(),
  setStackInput: (stackInput: StackInput) =>
    set((state) => ({ stackInput: { ...state.stackInput, ...stackInput } })),
  resetStackInput: () => set(() => ({ stackInput: { ...initStackInput() } })),
}));
