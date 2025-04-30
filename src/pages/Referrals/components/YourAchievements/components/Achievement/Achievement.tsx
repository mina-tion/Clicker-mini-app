import { Flex, Image } from '@chakra-ui/react';
import { ContentPanel } from '@components/ContentPanel';
import { InfoIcon } from '@components/InfoIcon';
import { Title } from '@components/Title';

type Props = {
  theme?: 'orange' | 'gray'
  iconSrc: string,
  value: string,
  label: string,
  reached?: boolean,
}

export function Achievement({ theme = 'gray', iconSrc, value, label, reached = false }: Props) {
  return (
    <ContentPanel borderColorVariant={reached ? 'orange' : 'gray'}>
      <Image w="52px" h="52px" src={iconSrc} />
      <Flex sx={{
        flex: '1 0 0',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '4px',
      }}>
        <Flex sx={{
          alignItems: 'center',
          alignSelf:'stretch',
          gap: '4px',
        }}>
          <Title variant="small" color="gray.400">{label}</Title>
          <InfoIcon />
        </Flex>
        <Title variant="medium" color={theme === 'orange' ? 'orange.400' : ''}>{value}</Title>
      </Flex>
    </ContentPanel>
  );
}
