import mascotWithStarImg from '@assets/images/icons/mascotWithStar.svg';
import { Flex, Image } from '@chakra-ui/react';
import { Title } from '@components/Title/Title';
import { observer } from 'mobx-react-lite';
import { LeaderboardStepper } from './components/LeaderboardStepper';

export const ClickerLeaderboard = observer(() => {
  return (
    <Flex
      p='40px 20px'
      h='inherit'
      direction='column'
      alignItems='center'
      gap='24px'
      width='100%'
    >
      <Title
        align='center'
        variant='custom'
        fontSize='20px'
        lineHeight='28px'
        color='#FDFAFF'
      >
        The more you click per day, the higher you rise! 🔥
      </Title>
      <LeaderboardStepper />
      <Image w='240px' h='250px' src={mascotWithStarImg} />
    </Flex>
  );
});
