// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttonTheme';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  background: {
    900: '#171717',
  },
  orange: {
    700: '#EF5A05',
    600: '#FF6301',
    500: '#F79009',
    400: '#FDB022',
    300: '#FEC84B',
    200: '#FEDF89',
    100: '#FEEFC7',
  },
  gray: {
    700: '#222222',
    650: '#2B2B2B',
    600: '#414141',
    500: '#636363',
    400: '#868686',
    300: '#ACACAC',
    200: '#D3D3D3',
    100: '#F1F1F1',
  },
  green: {
    100: '#A7F67B'
  }
};

const theme = extendTheme({ 
  colors, 
  components: { 
    Button: buttonTheme 
  }, 
});

export { theme };
