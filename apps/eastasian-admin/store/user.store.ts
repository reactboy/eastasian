import create from 'zustand';

type User = {
  id: string;
};

const initUser = (): User => ({
  id: '',
});

type UserState = {
  user: User;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: initUser(),
  setUser: (user: User) =>
    set((state) => ({ user: { ...state.user, ...user } })),
}));
