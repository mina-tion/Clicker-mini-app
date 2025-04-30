import { storeMobx } from '@core/store/store.ts';
import { useState, useEffect } from 'react';

const useCheckIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { telegram } = storeMobx;

  useEffect(() => {
    const platform = telegram.platform as string;
    setIsMobile(platform.toLowerCase() === 'ios'
      || platform.toLowerCase() === 'android');
  }, [telegram.platform]);

  return {
    isMobile,
  };
};

export default useCheckIsMobile;
