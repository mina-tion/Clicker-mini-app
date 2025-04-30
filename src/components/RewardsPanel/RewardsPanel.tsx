import stars from '@assets/images/icons/stars.svg';
import { Center, Image } from '@chakra-ui/react';
import { ContentPanel } from '@components/ContentPanel';
import { Title } from '@components/Title';
import { Reward } from '@core/types/Reward.ts';

type Props = {
  rewards?: Reward[],
}

const GPointsName = 'G-Points';

export function RewardsPanel({
  rewards,
}: Props) {

  return (
    <ContentPanel
      boxShadow='2px 4px 49.2px 0px rgba(255, 165, 0, 0.35), 1px 1px 2.5px 0px rgba(0, 0, 0, 0.50)'
      borderColorVariant='orange'
      position='relative'
      minHeight='38px'
    >
      <Image position='absolute' right='30px' src={stars} alt='stars'/>
      <Center position='absolute' flexDirection='column' left='-10px'>
        {rewards?.map((reward, index) => (
          <Image
            zIndex={2}
            w='70px'
            marginTop={index === 0 ? 0 : '-40px'}
            src={reward.logo}
            alt={reward.rewardName}
          />))}
      </Center>
      <Center flexDirection='column' w='100%'>
        {rewards?.map((reward) => (
          <Title
            variant='medium'
            color={reward.rewardName === GPointsName ? 'orange.400' : 'gray.100'}
          >
            {reward.rewardName}
          </Title>))}
      </Center>
    </ContentPanel>
  );
}
