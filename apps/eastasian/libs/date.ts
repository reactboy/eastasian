import { format } from 'date-fns';

export const formatDateText = (dateText: string, formatting: string) => {
  return format(new Date(dateText), formatting);
};
