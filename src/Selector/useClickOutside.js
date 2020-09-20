import { useEffect, useRef, useCallback } from 'react';

/**
 * `clickOutside`
 *
 * @callback clickOutsideCallback
 * @param {React.SyntheticEvent} event Accepts a usual react event
 */

/**
 * This hook identifies an outside click and call a callback function
 *
 * @category Hooks
 * @subcategory All
 * 
 * @param {clickOutsideCallback} clickOutside A function that is called when a click outside is occurred
 *
 * @returns {React.Ref} React reference for an html element
 */

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
