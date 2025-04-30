import referrals from '@assets/images/icons/referrals2.svg';
import { Center, Flex, useDisclosure, Image, Box } from '@chakra-ui/react';
import { MainButton } from '@components/MainButton';
import { RewardsPanel } from '@components/RewardsPanel';
import { SwipeableDrawer } from '@components/SwipeableDrawer';
import { Title } from '@components/Title';
import { BannerTypes } from '@core/constants/BannerTypes.ts';
import { EnergyToMultipliers, ClickerMultipliers } from '@core/constants/ClickerStates.ts';
import { GYDDE_BASE_URL } from '@core/constants/RedirectUrls.ts';
import { RequestStatuses } from '@core/constants/Statuses.ts';
import useReferralLink from '@core/hooks/useReferralLink.ts';
import { useTelegramAuth } from '@core/hooks/useTelegramAuth.ts';
import { storeMobx } from '@core/store/store.ts';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { Coins } from './components/Coins';
import { Energy } from './components/Energy';
import { Pusher } from './components/Pusher';
import { Reward } from './components/Reward';
const MIN_ENERGY = 0;
const ENERGY_PER_CLICK = 10;

const MIN_POINTS = 0;
const POINTS_PER_CLICK = 10;
const SEND_DATA_DELAY = 1000;

export const Game = observer(() => {
  const { game, telegram, authorization } = storeMobx;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isUserAuthorized } = useTelegramAuth(storeMobx);
  const { refLink, openRefLink } = useReferralLink();
  const [energyValue, setEnergyValue] = useState<number>(MIN_ENERGY);
  const [pointsToSend, setPointsToSend] = useState<number>(MIN_POINTS);
  const [totalEarnedPoints, setTotalEarnedPoints] = useState<number>(MIN_POINTS);
  const [isTimerMode, setIsTimerMode] = useState<boolean>(false);

  const maxEnergy = useMemo(
    () => EnergyToMultipliers[game.gameConfig?.multiplier || ClickerMultipliers.BRONZE],
    [game.gameConfig]
  );

  useEffect(() => {
    const checkTimerMode = () => {
      if (!game.gameConfig) {
        setIsTimerMode(false);
      } else {
        const inTimerMode = game.gameConfig.availablePoints === MIN_POINTS ||
          pointsToSend >= game.gameConfig.availablePoints;
        setIsTimerMode(inTimerMode);
      }
    };

    checkTimerMode();
  }, [game.gameConfig, pointsToSend, onOpen]);

  const handleSendData = useCallback(() => {
    game.addUserPoints({ points: pointsToSend });
    setPointsToSend(MIN_POINTS);
  }, [pointsToSend, game]);

  const onPusherClick = useCallback(() => {
    setEnergyValue((prev) => Math.max(prev - ENERGY_PER_CLICK, MIN_ENERGY));
    setTotalEarnedPoints((prev) => prev + POINTS_PER_CLICK);
    setPointsToSend((prev) => prev + POINTS_PER_CLICK);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (pointsToSend > MIN_POINTS) {
      timer = setTimeout(handleSendData, SEND_DATA_DELAY);
    }
    return () => clearTimeout(timer);
  }, [pointsToSend, handleSendData]);

  useEffect(() => {
    if (game.gameConfig) {
      setEnergyValue(Math.max(game.gameConfig.availablePoints, MIN_ENERGY));
      setTotalEarnedPoints(game.gameConfig.globalPoints);
    }
  }, [game.gameConfig]);

  useEffect(() => {
    if (game.addUserPointsStatus === RequestStatuses.RESOLVED && game.gameConfig?.availablePoints === 0) {
      if (!game.isVisitedGydde) {
        game.sendBanner({ type: BannerTypes.CLICK_GYDDE_BANNER} );
      }
      onOpen();
      game.resetStatuses();
    }
  }, [game.isVisitedGydde, game.addUserPointsStatus, game.gameConfig?.availablePoints, onOpen, game]);

  useEffect(() => {
    if (isUserAuthorized) {
      game.getConfig();
      game.getRecommendedGuide();
    }
  }, [game, isUserAuthorized]);

  return (
    <>
      {isUserAuthorized && (
        <Flex p="40px 0" h="inherit" direction="column" justify="flex-end" alignItems="center" gap="40px" width="100%">
          <Coins value={totalEarnedPoints}/>
          <Reward />
          <Pusher
            isTimerMode={isTimerMode}
            updateDate={game.gameConfig?.nextUpdateDate}
            state={game.gameConfig?.state}
            onPusherClick={onPusherClick}
          />
          <Energy value={energyValue} maxValue={maxEnergy} />
          <SwipeableDrawer
            isOpen={isOpen}
            onClose={onClose}
            title={!game.recommendedGuide
              ? 'Compete in our guides and win awesome prizes! 🔥'
              : 'Invite friends and get 50% of each friend\'s G-points 🔥'
            }
          >
            <Box marginTop='16px' />
            {game.recommendedGuide && (
              <>
                <RewardsPanel rewards={game.recommendedGuide.rewards}/>
                <Center gap='12px'>
                  <Title variant='medium' color='gray.400'>
                    Next guide:
                  </Title>
                  <Center gap='8px'>
                    <Image
                      src={game.recommendedGuide.avatar}
                      w='28px'
                      alt='guide avatar'
                      borderRadius='50%'
                    />
                    <Title variant='medium'>
                      {game.recommendedGuide.name}
                    </Title>
                  </Center>
                </Center>
              </>
            )}
            {!game.recommendedGuide && (
              <Center position='relative'>
                <Box position='absolute' sx={{
                  bg: 'linear-gradient(180deg, rgba(108, 72, 245, 0.19) 0%, rgba(110, 70, 244, 0.16) 100%)',
                  filter: 'blur(65px)',
                  w: '100%',
                  h: '100%',
                }} />
                <Image
                  src={referrals}
                  alt='referrals'
                />
              </Center>
            )}
            <MainButton
              onClick={() => {
                if (game.recommendedGuide) {
                  const encodedToken = encodeURIComponent(authorization.authToken || '');
                  telegram.openLink(`${GYDDE_BASE_URL}?guideId=${game.recommendedGuide.questId}&token=${encodedToken}`);
                } else if (refLink) { openRefLink(); }
              }}
            marginTop='32px'
            >
              {game.recommendedGuide ? 'Go to the guide' : 'Invite friends'}
            </MainButton>
          </SwipeableDrawer>
        </Flex>
      )}
      {!isUserAuthorized && authorization.authStatus === RequestStatuses.REJECTED && (<Center>
        <Title variant='extra-medium' textAlign='center'>This page is not available now. An authentication error has occurred</Title>
      </Center>)}
      {!isUserAuthorized && authorization.authStatus === RequestStatuses.LOADING && (<Center>
        <Title variant='extra-medium' textAlign='center'>Loading...</Title>
      </Center>)}
    </>
  );
});
