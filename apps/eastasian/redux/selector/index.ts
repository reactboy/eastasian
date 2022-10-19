import { useSelector } from 'react-redux';

import { RootState } from '@resume/redux/app';

export const useSelectLanguage = () =>
  useSelector((state: RootState) => state.language);
