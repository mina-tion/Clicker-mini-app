import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Roboto';
        src: url('fonts/Roboto-Regular.ttf');
        font-weight: 400;      
      }

      @font-face {
        font-family: 'Roboto';
        src: url('fonts/Roboto-Bold.ttf');
        font-weight: 700;      
      }        

      @font-face {
        font-family: 'Russo One';
        src: url('fonts/RussoOne-Regular.ttf');
        font-weight: 400;      
      }
      @font-face {
        font-family: 'Noto Sans Devanagari';
        src: url('fonts/NotoSansDevanagari-Bold.ttf');
        font-weight: 700;      
      }
    `}
  />
);

export default Fonts;
