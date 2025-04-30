import { Store } from '@core/store/store';
import { useCallback } from 'react';

export const useTelegramAuth = (store: Store) => {
  const { authorization, telegram } = store;
  const { isAuthorized, authToken } = authorization;
  const { initData, initDataUnsafe } = telegram;

  const authorize = useCallback(() => {
    if (!initData && authToken) return;

    authorization.getAuthToken({
      authData: initData,
      referralData: initDataUnsafe.start_param,
    });
  }, [authToken, authorization, initData, initDataUnsafe]);

  return {
    authorize,
    isUserAuthorized: isAuthorized
  };
};
