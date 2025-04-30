import { ChakraProvider } from '@chakra-ui/react';
import { ErrorBoundary } from '@components/Error/ErrorBoundary';
import Fonts from '@components/Fonts/Fonts';
import { Web3SdkProvider } from '@components/Web3SdkProvider';
import { theme } from '@core/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { twaInit } from './twa-init';

import './index.css';

twaInit();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Fonts />
        <ErrorBoundary>
          <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY}
          >
            <Web3SdkProvider>
              <App />
            </Web3SdkProvider>
          </GoogleReCaptchaProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
