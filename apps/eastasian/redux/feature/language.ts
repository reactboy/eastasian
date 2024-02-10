import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Language = 'en' | 'ja';

type State = Language;

const initState = (): State => {
  return 'ja';
};

const languageSlice = createSlice({
  name: 'language',
  initialState: initState(),
  reducers: {
    setLanguage: (state, action: PayloadAction<State>) => {
      const language = action.payload;
      state = language;
      return state;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
