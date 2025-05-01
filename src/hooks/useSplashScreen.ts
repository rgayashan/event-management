import { useState, useEffect } from 'react';

const useSplashScreen = (minimumLoadingTime: number = 2000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadingTime);

    return () => clearTimeout(timer);
  }, [minimumLoadingTime]);

  return isLoading;
};

export default useSplashScreen; 