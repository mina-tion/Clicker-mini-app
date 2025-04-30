import coinIcon from '@assets/images/icons/coin.svg';
import calendarIcon from '@assets/images/icons/daily-calendar.svg';
import friendsIcon from '@assets/images/icons/fliends.svg';
import { Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Achievement } from './components/Achievement';

interface Stats {
  icon: string,
  text: string,
  value: string,
  reached: boolean,
  theme?: 'orange' | 'gray',
}

interface AchievementProps {
  friendsAmount: number,
}

export function YourAchievements({ friendsAmount }: AchievementProps) {
  const stats: Stats[] = useMemo(() => ([
    {
      icon: coinIcon,
      text: 'Total referrer G-points',
      value: 'Coming soon',
      reached: true,
      theme: 'orange'
    },
    {
      icon: friendsIcon,
      text: 'Your friends',
      value: `${friendsAmount}`,
      reached: false,
    },
    {
      icon: calendarIcon,
      text: 'Avg daily G-points',
      value: 'Coming soon',
      reached: false,
      theme: 'orange'
    }
  ]), [friendsAmount]);


  return (
    <Flex sx={{
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf:  'stretch',
      gap: '12px'
    }}>
      {stats.map((item, idx) => (
        <Achievement key={idx} theme={item.theme} reached={item.reached} iconSrc={item.icon} value={item.value} label={item.text} />
      ))}
    </Flex>
  );
}
