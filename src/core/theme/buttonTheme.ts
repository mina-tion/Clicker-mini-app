import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle({
  background: 'green.100'
});

export const buttonTheme = defineStyleConfig({
  variants: { solid },
});
