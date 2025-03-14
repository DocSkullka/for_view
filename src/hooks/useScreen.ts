import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export const useScreen = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleSize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 300);

  useEffect(() => {
    if (!windowSize.width) {
      setWindowSize((prev) => ({ ...prev, width: window.innerWidth }));
    }

    if (!windowSize.height) {
      setWindowSize((prev) => ({ ...prev, height: window.innerHeight }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return { windowSize };
};
