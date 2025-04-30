import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { metaMaskSDKConnector } from './connectors/metamask';

type WagmiWrapperProviderProps = {
  children: ReactNode;
};

const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [sepolia],
  connectors: [metaMaskSDKConnector],
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export function WagmiWrapperProvider({ children }: WagmiWrapperProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
