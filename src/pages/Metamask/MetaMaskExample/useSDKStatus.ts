import { useSDK } from '@metamask/sdk-react';

export function useSDKStatus() {
  const { connected, account } = useSDK();

  return {
    isConnected: connected && !!account
  };
}
