import { ReactNode } from 'react';
import { WagmiWrapperProvider } from './WagmiWrapperProvider';

type Web3SdkProviderProps = {
  children: ReactNode;
};

export function Web3SdkProvider({ children }: Web3SdkProviderProps) {
  return <WagmiWrapperProvider>{children}</WagmiWrapperProvider>;
}
