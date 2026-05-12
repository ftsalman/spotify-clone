import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [on, setOn] = useState(initialValue);

  const handleToggle = (value = null) => {
    if (value !== null) {
      return setOn(value);
    } 
    setOn(!on);
  };

  return [on, handleToggle];
};
