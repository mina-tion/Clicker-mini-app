import { Button } from '@chakra-ui/react';
import { useSDK } from '@metamask/sdk-react';
import { useSDKStatus } from './useSDKStatus';

export const Terminate = () => {
  const { sdk } = useSDK();
  const { isConnected } = useSDKStatus();
  
  const terminate = () => {
    sdk?.terminate();
  };

  return (
    <>
      { isConnected && ( 
        <Button backgroundColor='red' color="white" onClick={terminate}>Terminate</Button>
      )}
    </>
  );
};
