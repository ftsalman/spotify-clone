import { useEffect, useState } from "react";

export const useDelayUnmount = (isMounted, delay = 300) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !shouldRender) {
      timeoutId = window.setTimeout(() => setShouldRender(true), 0);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delay);
    }

    return () => clearTimeout(timeoutId);
  }, [delay, isMounted, shouldRender]);

  return shouldRender;
};
