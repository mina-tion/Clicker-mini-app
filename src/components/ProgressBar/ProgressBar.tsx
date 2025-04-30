import { Progress } from '@chakra-ui/react';

interface  ProgressBarProps {
  value: number,
}
export function ProgressBar({ value }: ProgressBarProps) {

  return (
    <Progress
      width="100%"
      height="12px"
      borderRadius="md"
      bg='rgba(134, 134, 134, 0.2)'
      value={value}
      sx={{
        p: '2px',
        '& > div': {
          background: 'linear-gradient(90deg, rgba(204, 254, 191, 0.88) 15%, rgba(171, 229, 145, 0.88) 38.75%, rgba(154, 216, 123, 0.88) 50.63%, rgba(137, 203, 100, 0.88) 62.5%, rgba(167, 246, 123, 0.88) 95%)',
        },
      }}
    />
  );
}
