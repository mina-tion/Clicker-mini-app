import { Center, Flex } from '@chakra-ui/react';
import { MetaMaskWrapperProvider } from '@components/Web3SdkProvider/MetaMaskWrapperProvider';
import { useSDK } from '@metamask/sdk-react';
import { Connect } from './Connect';
import { ShowSDKParams } from './ShowSDKParams';
import { SwitchTo } from './SwitchTo';
import { Terminate } from './Terminate';

export const MetaMaskExample = () => {
  const { connecting } = useSDK();

  return (
    <MetaMaskWrapperProvider>
      <Flex
        sx={{
          padding: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Center>MetaMask SDK Example</Center>

        <ShowSDKParams />

        <Center>
          {connecting && (
            <div>Waiting for Metamask to link the connection...</div>
          )}
        </Center>

        <Flex gap='10px'>
          <Connect />
          <Terminate />
          <SwitchTo />
        </Flex>
      </Flex>
    </MetaMaskWrapperProvider>
  );
};
