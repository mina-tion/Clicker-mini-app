import { Center, Flex } from '@chakra-ui/react';
import { Account } from './Account';
import { Claim } from './Claim';
import { Connect } from './Connect';
import { Connections } from './Connections';
import { SwitchChain } from './SwitchChain';

export const WagmiExample = () => {
  return (
    <Flex
      sx={{
        padding: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Center>Wagmi Example</Center>
      <Account />
      <Connect />
      <SwitchChain />
      <Connections />
      <Claim />
    </Flex>
  );
};
