
import WebApp from '@twa-dev/sdk';
import { WebApp as WebAppTypes } from '@twa-dev/types';
import { useEffect, useMemo, useState } from 'react';

export const useTelegramMiniApp = () => {

  const [webApp, setWebApp] = useState<WebAppTypes | null>(null);

  useEffect(() => {
    if (WebApp) {
      setWebApp(WebApp);
    }
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          initData: webApp.initData,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return value;
};
