import { Button } from '@chakra-ui/react';
import { useSDK } from '@metamask/sdk-react';
import { useEffect, useState } from 'react';
import { ShowError } from './ShowError';
import { useSDKStatus } from './useSDKStatus';

export const Connect = () => {
  const { sdk, connecting } = useSDK();
  const [ error, setError ] = useState<Error | undefined>(undefined);
  const { isConnected } = useSDKStatus();
  
  useEffect(()=> {
    setError(undefined);
  }, []);

  const connect = async () => {
    try {
      if (connecting) {
        await sdk?.resume();
      } else {
        await sdk?.connect();
      }
    } catch (err) {
      setError(err as Error);
      console.warn('failed to connect..', err);
    }
  };

  return (
    <>
      { !isConnected && (
        <>
          <Button onClick={connect}>Connect</Button>
          <ShowError error={error} />
        </>
      )}
    </>
  );
};
