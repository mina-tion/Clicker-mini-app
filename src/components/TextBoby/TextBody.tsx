import { Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  variant: 'small';
  children:  ReactNode;
}

export function TextBody({ variant, children }: Props) {
  let styles: TextProps = {
    fontFamily: 'Roboto'
  };

  if (variant === 'small') {
    styles = {
      ...styles,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.004em',
      textAlign: 'center',
    };
  }

  return (
    <Text {...styles}>{children}</Text>
  );
}
