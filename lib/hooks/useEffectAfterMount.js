import { useEffect, useRef } from "react";

export const useEffectAfterMount = (fn = () => {}, deps = []) => {
  const isMounted = useRef(false);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fnRef.current();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
