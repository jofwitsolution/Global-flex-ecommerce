import { useState } from 'react';

const useDialog = (callback, title) => {
  const [isToggle, setIsToggle] = useState(false);

  return { isToggle, setIsToggle, callback, title };
};

export default useDialog;
