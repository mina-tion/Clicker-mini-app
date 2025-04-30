import { MotionBox } from '@components/MotionBox';
import { Title } from '@components/Title';
import { memo } from 'react';

const POINTS_PER_CLICK = 10;

export type AnimatedPoint = {
  id: string;
  x: number;
  y: number;
}

type Props = {
  anim: AnimatedPoint
}

export const AnimatedPoints = memo(function ({ anim }: Props) {
  return (
    <MotionBox
      key={anim.id}
      initial={{ opacity: 1, transform: `translate(${anim.x}px, ${anim.y}px)` }}
      animate={{
        opacity: [1, 0.5, 0],
        transform: [
          `translate(${anim.x}px, ${anim.y}px)`,
          `translate(${anim.x}px, ${anim.y - 100}px)`,
          `translate(${anim.x}px, ${anim.y - 200}px)`,
        ],
      }}
      exit={{ opacity: 0 }}
      // @ts-expect-error no problem in operation, although type error appears.
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        opacity: { delay: 0.2 },
      }}
      sx={{
        position: 'absolute',
        cursor: 'pointer',
        zIndex: 10
      }}>
      <Title
        className="prevent-select"
        variant="custom"
        fontSize='32px'
      >
        +{POINTS_PER_CLICK}
      </Title>
    </MotionBox>
  );
});
