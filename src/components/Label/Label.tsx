import { Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  variant: 'placeholder' | 'button' | 'subheadline';
  children:  ReactNode;
}

export function Label({ variant, children, ...restStyles }: Props | TextProps) {
  let styles: TextProps = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
  };

  if (variant === 'placeholder') {
    styles = {
      ...styles,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.4px',
      textAlign: 'center',
      color: 'gray.400'
    };
  }

  if (variant === 'button') {
    styles = {
      ...styles,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.08px',
    };
  }

  if (variant === 'subheadline') {
    styles = {
      ...styles,
      fontWeight: '600',
      fontSize: '15px',
      lineHeight: '22px',
      letterSpacing: '0.15px',
    };
  }

  if (variant === 'text') {
    styles = {
      ...styles,
      fontWeight: '600',
      fontSize: '17px',
      lineHeight: '26px',
      letterSpacing: '0.1px',
    };
  }  

  return (
    <Text {...styles} {...restStyles}>{children}</Text>
  );
}
