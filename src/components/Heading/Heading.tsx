import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';

type Props = {
  variant: 'primary' | 'medium'
  children: React.ReactNode;
}

export function Heading({ variant, children, ...props}: Props & HeadingProps) {
  let styled: HeadingProps = {
    as:  'h2',
    fontFamily: 'Russo One',
    fontStyle: 'normal',
    fontWeight: 400,
  };

  if (variant === 'medium') {
    styled = {
      ...styled,
      fontSize: '16px',
      lineHeight: '24px'
    };
  }

  if (variant === 'primary') {
    styled = {
      ...styled,
      fontSize: '20px',
      lineHeight: '24px'
    };
  }

  return (
    <ChakraHeading {...styled} {...props}>
      {children}
    </ChakraHeading>
  );
}
