import { ROUTES_NAME } from '@core/constants/Routes';
import { FEATURE_TOGGLES } from '@core/feature-toggles';
import { useTelegramAuth } from '@core/hooks/useTelegramAuth.ts';
import { storeMobx } from '@core/store/store.ts';
import { BaseLayout } from '@layouts';
import { AccountAbstraction } from '@pages/AccountAbstraction';
import { ClickerLeaderboard } from '@pages/ClickerLeaderboard';
import { Earn } from '@pages/Earn';
import { Error } from '@pages/Error';
import { Game } from '@pages/Game';
import { Metamask } from '@pages/Metamask';
import { Referrals } from '@pages/Referrals';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = observer(() => {
  const { authorize } = useTelegramAuth(storeMobx);

  useEffect(() => {
    authorize();
  }, [authorize]);

  return (
    <Routes>
      <Route
        path={ROUTES_NAME.ROOT}
        element={<BaseLayout />}
        errorElement={<Error />}
      >
        <Route
          path={ROUTES_NAME.ROOT}
          element={<Game />}
          errorElement={<Error />}
        />
        <Route path={ROUTES_NAME.REFERRALS} element={<Referrals />} />
        <Route path={ROUTES_NAME.EARN} element={<Earn />} />
        <Route
          path={ROUTES_NAME.LEADERBOARD}
          element={<ClickerLeaderboard />}
        />
        {FEATURE_TOGGLES.METAMASK.ENABLED && (
          <Route path={ROUTES_NAME.METAMASK} element={<Metamask />} />
        )}
        {FEATURE_TOGGLES.ACCOUNT_ABSTRACTION.ENABLED && (
          <Route
            path={ROUTES_NAME.ACCOUNT_ABSTRACTION}
            element={<AccountAbstraction />}
          />
        )}
      </Route>
      {/* DEFAULT */}
      <Route
        path={ROUTES_NAME.REFERRALS}
        element={<Navigate to={ROUTES_NAME.ROOT} replace={true} />}
      />
    </Routes>
  );
});
