import coinIcon from '@assets/images/icons/coin.svg';
import { Flex, Image } from '@chakra-ui/react';
import { Title } from '@components/Title';

export const EarnTitle = () => {
  return (
      <Flex sx={{
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: '12px',
      }}>
        <Image w="90px" h="90px" src={coinIcon} alt="G coin" />
        <Title variant="custom" 
          sx={{ 
            fontSize: '28px',
            lineHeight: '32px',
            textAlign: 'center',
          }}
        >Earn G-points and other rewards!</Title>
      </Flex>
  );
};
