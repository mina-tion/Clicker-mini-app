import {useTelegramAuth} from '@core/hooks/useTelegramAuth.ts';
import { storeMobx } from '@core/store/store.ts';
import { useEffect } from 'react';

const useReferralLink = () => {
  const { referrals, telegram} = storeMobx;
  const { isUserAuthorized } = useTelegramAuth(storeMobx);

  useEffect(() => {
    if (isUserAuthorized) {
      referrals.getRefLink();
    }
  }, [referrals, isUserAuthorized]);

  return {
    openRefLink: () => {
      const url = encodeURIComponent(referrals.link || '');
      const text = encodeURIComponent('Exclusive way to get free G-Points and earn airdrops!\n' +
        'Complete quests, invite friends and explore the Web3 together');
      const shareLink = `https://t.me/share/url?url=${url}&text=${text}`;
      telegram.openTelegramLink(shareLink);
    },
    refLink: referrals.link,
  } ;
};

export default useReferralLink;
