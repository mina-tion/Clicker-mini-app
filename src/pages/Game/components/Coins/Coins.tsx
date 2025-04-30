import coinIcon from '@assets/images/icons/coin.svg';
import { Flex, Image } from '@chakra-ui/react';
import { ContentPanel } from '@components/ContentPanel';
import { Title } from '@components/Title';

interface CoinsProps {
  value: number;
}
export function Coins({ value } : CoinsProps) {

  return (
    <ContentPanel sx={{
      p: '12px',
      w: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px'
    }}>
      <Flex p="0" justifyContent="center" alignItems="center" gap="4px">
        <Image w="42px" h="42px" src={coinIcon} />
        <Title variant="large" color="#FDB022" textAlign="center">{value}</Title>
      </Flex>
    </ContentPanel>
  );
}
