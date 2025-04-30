import { Button } from '@chakra-ui/react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';

export function Account() {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({
    address: account.address,
  });

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address} {ensName}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status !== 'disconnected' && (
        <Button type="button" onClick={() => disconnect()}>
          Disconnect
        </Button>
      )}
    </div>
  );

  // return (
  //   <div>Account</div>
  // );
}
