import { Button } from '@chakra-ui/react';
import { ButtonProps } from '@chakra-ui/react';
import { Label } from '@components/Label';
import { ReactNode } from 'react';

interface MainButtonProps extends ButtonProps{
  children?: ReactNode,
}

export function MainButton({ children, ...styled } : MainButtonProps) {
  return (
    <Button
      colorScheme="green"
      sx={{
        w: '100%',
        borderRadius: '40px',
        '&:hover': {
          bg: '#89CB64'
        }
      }}
      {...styled}
    >
      <Label variant="button" color="background.900">{children}</Label>
    </Button>
  );
}
