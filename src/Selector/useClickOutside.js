import { useEffect, useRef, useCallback } from 'react';

const useClickOutside = (clickOutside) => {
  const elemRef = useRef();

  const onClickOutside = useCallback(
    (e) => {
      if (elemRef.current && !elemRef.current.contains(e.target)) {
        clickOutside(e);
      }
    },
    [clickOutside]
  );

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClickOutside]);

  return elemRef;
};

export default useClickOutside;
