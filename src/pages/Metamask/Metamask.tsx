import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { MetaMaskExample } from './MetaMaskExample';
import { WagmiExample } from './WagmiExample';

type View = 'metamask-sdk' | 'wagmi';

export const Metamask = () => {
  const [view, setView] = useState<View>('wagmi');
  return (
    <Flex flexDirection='column' gap='40px'>
      <Flex gap='10px'>
        <Button onClick={() => setView('wagmi')}>Wagmi</Button>
        <Button onClick={() => setView('metamask-sdk')}>MetaMask SDK</Button>
      </Flex>
      <>
        {view === 'metamask-sdk' && <MetaMaskExample />}
        {view === 'wagmi' && <WagmiExample />}
      </>
    </Flex>
  );
};
