import { Box, Flex, FlexProps, Image } from '@chakra-ui/react';
import { AnimatedPoint, AnimatedPoints } from '@components/animated/AnimatedClickerPoints';
import {
  ClickerStates,
  ImagesToClickerStates
} from '@core/constants/ClickerStates.ts';
import useCheckIsMobile from '@core/hooks/useCheckIsMobile.ts';
import { storeMobx } from '@core/store/store';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Timer } from './Timer';

interface PusherProps extends FlexProps {
  onPusherClick: () => void;
  isTimerMode: boolean;
  updateDate: string | undefined;
  state: string | undefined;
}

export const Pusher = observer(({ onPusherClick, state = ClickerStates.DEFAULT_FIRST, isTimerMode, updateDate, ...styled }: PusherProps) => {
  const { telegram } = storeMobx;
  const { isMobile } = useCheckIsMobile();
  const [activeTaps, setActiveTaps] = useState<number>(0);
  const [pointsAnimations, setPointsAnimations] = useState<AnimatedPoint[]>([]);

  const clickerRef = useRef<HTMLDivElement>(null);

  function isTouchEvent(event: React.MouseEvent<HTMLImageElement, MouseEvent> | React.TouchEvent<HTMLImageElement>): event is React.TouchEvent<HTMLImageElement> {
    return (event as React.TouchEvent<HTMLImageElement>).changedTouches !== undefined;
  }

  const handleImageClick = useCallback((event: React.MouseEvent<HTMLImageElement, MouseEvent> | React.TouchEvent<HTMLImageElement>) => {
    if (!clickerRef.current) return;
    telegram.hapticFeedback('medium');

    onPusherClick();

    const newAnimation = isTouchEvent(event)
      ? buildAnimationByTouchEvent(event)
      : buildAnimationByMouseEvent(event);
    if (!newAnimation) return;

    setPointsAnimations((current) => [...current, newAnimation]);
  }, [telegram, onPusherClick]);

  const handleTouchStart = useCallback(() => {
    setActiveTaps((prev) => Math.min(prev + 1, 4));
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLImageElement>) => {
      if (activeTaps < 4 && !isTimerMode) {
        handleImageClick(event);
      }
      setActiveTaps((prev) => Math.max(prev - 1, 0));
    },
    [activeTaps, handleImageClick, isTimerMode]
  );

  function buildAnimationByMouseEvent(event: React.MouseEvent<HTMLImageElement, MouseEvent>): AnimatedPoint | null {
    if (!clickerRef.current) return null;

    const rect = clickerRef.current.getBoundingClientRect();

    return {
      id: uuidv4(),
      x: event.clientX - rect.x - (rect.width / 2),
      y: event.clientY - rect.y,
    };
  }

  function buildAnimationByTouchEvent(event: React.TouchEvent<HTMLImageElement>): AnimatedPoint | null {
    if (!clickerRef.current) return null;

    const rect = clickerRef.current.getBoundingClientRect();

    const clientX = event.changedTouches[0].clientX;
    const clientY = event.changedTouches[0].clientY;

    return {
      id: uuidv4(),
      x: clientX - rect.x - (rect.width / 2),
      y: clientY - rect.y,
    };
  }

  return (
    <Flex
      className="prevent-select"
      ref={clickerRef}
      width="100%"
      position="relative"
      justifyContent="center"
      {...styled}>
      <Box
        className="prevent-select"
        width="fit-content"
        height="fit-content"
        borderRadius="50%"
        overflow="hidden"
      >
        <Image
          role="button"
          className="prevent-select"
          src={ImagesToClickerStates[state as keyof typeof ImagesToClickerStates]}
          alt='clicker'
          draggable='false'
          onMouseUp={(event) => {
            if (!isTimerMode && !isMobile) {
              handleImageClick(event);
            }
          }}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            position: 'relative',
            zIndex: 1,
            filter: `${isTimerMode ? 'blur(10px)' : 'none'}`,
            transition: 'duration 0.1s',
            '&:active': {
              filter: !isTimerMode && 'brightness(90%) drop-shadow(0 2px 3px rgba(255, 255, 255, 0.15))',
            },
          }}
        />
      </Box>
      <AnimatePresence>
        {pointsAnimations.map((anim) => (
          <AnimatedPoints key={anim.id} anim={anim} />
        ))}s
      </AnimatePresence>
      {updateDate && isTimerMode && (<Timer sx={{
        position: 'absolute',
        top: '0%',
        left: '0%',
        w: '100%',
        h: '100%',
        zIndex: 3,
      }} date={updateDate}/>)}
    </Flex>
  );
});
