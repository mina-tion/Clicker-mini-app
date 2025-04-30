import { Flex } from '@chakra-ui/react';
import { Heading } from '@components/Heading';
import { GYDDE_BASE_URL } from '@core/constants/RedirectUrls.ts';
import { RequestStatuses } from '@core/constants/Statuses.ts';
import { storeMobx } from '@core/store/store.ts';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Guide } from './components/Guide';

export const Guides = observer(() => {
  const { guides, telegram, authorization, game } = storeMobx;

  const [redirectLink, setRedirectLink] = useState<string>('');

  const handleGuideClick = ({ guideId }: { guideId: number }) => {
    const encodedToken = encodeURIComponent(authorization.authToken || '');
    telegram.openLink(`${GYDDE_BASE_URL}?guideId=${guideId}&token=${encodedToken}`);
  };

  useEffect(() => {
    guides.getList({ language: 'EN' });
  }, [guides]);

  useEffect(() => {
    if (game.sendBannerStatus === RequestStatuses.RESOLVED && redirectLink) {
      telegram.openLink(redirectLink);
      setRedirectLink('');
      game.resetStatuses();
    }
  }, [game, game.sendBannerStatus, telegram, redirectLink]);

  return (
    <Flex sx={{
      flexDirection: 'column',
      alignItems: 'flex-start',
      alignSelf: 'stretch',
      gap: '12px'
    }}>
      <Heading variant="medium">Gydde WEB3</Heading>
      {(guides.list || []).map((guide, idx) => (
        <Guide
          key={idx}
          iconSrc={guide.avatar}
          reward={guide.questDetails.rewardInfo}
          partner={guide.partner}
          handleClick={() => handleGuideClick({ guideId: guide.id })}
        />
      ))}
    </Flex>
  );
});
