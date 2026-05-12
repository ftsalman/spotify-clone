import { useEffect } from "react";

let SCROLL_COUNT = 0;

export const usePreventScroll = (isDisabled = false) => {
  useEffect(() => {
    if (isDisabled) return;

    SCROLL_COUNT++;

    if (SCROLL_COUNT === 1) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      SCROLL_COUNT--;
      if (SCROLL_COUNT === 0) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isDisabled]);
};
