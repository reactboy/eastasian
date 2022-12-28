import { useRef } from 'react';

export const useDebounce = (interval: number) => {
  const debounceTimer = useRef(null);
  const debounce = (callBack: () => void) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      callBack();
    }, interval);
  };

  return debounce;
};
