import { MetaMaskProvider } from '@metamask/sdk-react';
import { ReactNode } from 'react';
import { MetaMaskSDKParams } from './connectors/MetaMaskOptions';

type MetaMaskWrapperProviderProps = {
  children: ReactNode
}

export function MetaMaskWrapperProvider({ children } : MetaMaskWrapperProviderProps) {
  return (
    <MetaMaskProvider debug={false} sdkOptions={MetaMaskSDKParams}>
      {children}
    </MetaMaskProvider>
  );
}
