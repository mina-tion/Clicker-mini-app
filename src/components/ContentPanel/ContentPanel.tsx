import { Flex, FlexProps } from '@chakra-ui/react';

type BorderColorVariant = 'orange' | 'gray' | 'red' | 'green' | 'none' 

type Props = {
  borderColorVariant?: BorderColorVariant,
  children: React.ReactNode,
}

const BORDER_COLOR: Record<BorderColorVariant, string> = {
  'orange': 'orange.400',
  'gray': 'gray.600',
  'red': '#F04438',
  'green': '#A7F67B',
  'none': ''
} as const;

export function ContentPanel({
  borderColorVariant = 'gray',
  children,
  sx,
  ...styled
}: Props & FlexProps) {

  if (borderColorVariant !== 'none') {
    styled.border = '1px solid';
    styled.borderColor = BORDER_COLOR[borderColorVariant];
  }

  return (
    <Flex sx={{
        p: '12px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: '8px',
        borderRadius: '20px',
        background: 'linear-gradient(137deg, rgba(23, 23, 23, 0.50) 11.14%, rgba(50, 48, 48, 0.50) 84.99%)',
        ...sx
      }}
      {...styled}
    >
      {children}
    </Flex>
  );
}
