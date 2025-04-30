import mascotErrorImg from '../../../assets/images/icons/mascotError.svg';
import { Title } from '@components/Title/Title';
import { MainButton } from '@components/MainButton/MainButton';
import { Flex, Image, Link } from '@chakra-ui/react';
import { ROUTER_LINKS } from '@core/constants/RouterLinks';

export function ErrorFallback() {
  return (
    <Flex
      h='100%'
      direction='column'
      alignItems='center'
      justifyContent='flex-end'
      w='100vw'
      p='0 22px 45px 22px'
      bg='#171717'
    >
      <Image mb='113px' w='228px' src={mascotErrorImg} />
      <Flex
        mb='60px'
        direction='column'
        textAlign='center'
        gap='40px'
        justifyContent='center'
      >
        <Title color='#FFF' variant='extra-medium'>{'Oops... there’s nothing here'}</Title>
        <Title color='#FFF' variant='medium'>{'It looks like you are lost in space'}</Title>
      </Flex>
      <Link w='100%' href={ROUTER_LINKS.GAME}>
        <MainButton bg='#A7F67B' h='48px'>
          <Title variant='medium'>{'Go back home'}</Title>
        </MainButton>
      </Link>
    </Flex>
  );
};
