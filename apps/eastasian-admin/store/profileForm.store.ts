import create from 'zustand';

export type ProfileInput = {
  id: string;
  name: string;
  nameJp: string;
  description: string;
  descriptionJp: string;
  snsInstagram: string;
  snsGithub: string;
  profileImage: string;
};

const initProfileInput = (): ProfileInput => ({
  id: '',
  name: '',
  nameJp: '',
  description: '',
  descriptionJp: '',
  snsInstagram: '',
  snsGithub: '',
  profileImage: '',
});

type ProfileState = {
  profileInput: ProfileInput;
  setProfileInput: (profileInput: ProfileInput) => void;
  resetProfileInput: () => void;
};

export const useProfileInputStore = create<ProfileState>((set) => ({
  profileInput: initProfileInput(),
  setProfileInput: (profileInput: ProfileInput) =>
    set((state) => ({
      profileInput: { ...state.profileInput, ...profileInput },
    })),
  resetProfileInput: () =>
    set(() => ({ profileInput: { ...initProfileInput() } })),
}));
