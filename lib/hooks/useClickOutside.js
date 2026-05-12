import { useEffect, useRef, useImperativeHandle } from "react";

export const useClickOutside = (callback, forwardedRef) => {
  const internalRef = useRef(null);

  useImperativeHandle(forwardedRef, () => internalRef.current);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (internalRef?.current && !internalRef.current.contains(event.target)) {
        callback?.(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, internalRef]);

  return internalRef;
};
