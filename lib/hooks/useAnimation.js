import { useState } from "react";

export const useAnimation = (iniState = false, delay = 250) => {
  const [render, setRender] = useState(iniState);
  const [isOpen, setIsOpen] = useState(iniState);

  const handleOpen = () => {
    setRender(true);

    // next frame → next frame → guaranteed transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  };

  const handleClose = () => {
    setIsOpen(false);

    // wait for close animation to finish
    setTimeout(() => {
      setRender(false);
    }, delay);
  };

  return [render, isOpen, handleOpen, handleClose];
};
