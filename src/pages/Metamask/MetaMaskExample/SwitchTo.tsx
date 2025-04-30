import { Button } from '@chakra-ui/react';

import { useSDK } from '@metamask/sdk-react';
import { useEffect, useState } from 'react';
import { ShowError } from './ShowError';
import { useSDKStatus } from './useSDKStatus';

export const SwitchTo = () => {
  const { provider } = useSDK();
  const { isConnected } = useSDKStatus();
  const [ error, setError ] = useState<Error | undefined>(undefined);

  useEffect(()=> {
    setError(undefined);
  }, []);

  const changeNetwork = async (hexChainId: string) => {
    console.log(`switching to network chainId=${hexChainId}`);
    try {
      const response = await provider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
      });
      console.log('response', response);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    }
  };

  return (
    <>
        { isConnected && (
          <>
            <Button
              onClick={() => changeNetwork('0x89')}
            >
              Switch to Polygon
            </Button>

            <ShowError error={error} />
          </>
        )}
    </>
  );
};
