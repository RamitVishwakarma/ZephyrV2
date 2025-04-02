import { useEffect, useState } from 'react';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    // Function to update width
    const updateWidth = () => setScreenWidth(window.innerWidth);

    // Set initial width
    updateWidth();

    // Listen for resize events
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return screenWidth;
};
