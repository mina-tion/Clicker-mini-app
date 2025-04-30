import coinIcon from '@assets/images/icons/coin.svg';
import { BoxProps, Flex, Image } from '@chakra-ui/react';
import { ContentPanel } from '@components/ContentPanel';
import { Label } from '@components/Label';
import { Title } from '@components/Title';

type Props = {
  index: number;
  nickname: string;
}

export function Friend({ index, nickname, ...styled }: Props & BoxProps) {
  return (
    <ContentPanel borderColorVariant='none'
      sx={{
        p: '4px 8px',
        background: 'linear-gradient(93deg, #2B2B2B 0%, #2B2B2B 99.57%)',
        backdropFilter: 'blur(15px)'
      }}
      {...styled}>
      <Label w="32px" variant="placeholder">{index}</Label>
      
      <Flex sx={{
        p: '4px 0',
        flex: '1 0 0',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '4px'
      }}>
        <Label variant="button">{nickname}</Label>
        <Flex sx={{
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: '4px'
        }}>
          <Image w="10px" h="10px" src={coinIcon} />
          <Title variant="extra-small" color="orange.400">soon</Title>
        </Flex>
      </Flex>

      <Flex sx={{
        ml: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px'
      }}>
        <Image w="24px" h="24px" src={coinIcon} />
        <Title variant="medium" letterSpacing="0.48px" color="orange.400">soon</Title>
      </Flex>
    </ContentPanel>
  );
}
