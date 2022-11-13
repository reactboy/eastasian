import { format } from 'date-fns';

//TODO(eastasian) extract to utils
export const getDefaultDate = (date: string, formatting = 'yyyy-MM-dd') => {
  return date ? format(new Date(date), formatting) : '';
};
