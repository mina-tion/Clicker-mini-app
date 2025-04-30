import { Button, Flex } from '@chakra-ui/react';
import { metaMaskSDKConnector } from '@components/Web3SdkProvider/connectors/metamask';
import { useAccount, useChainId, useConnect } from 'wagmi';

export function Connect() {
  const account = useAccount();
  const chainId = useChainId();
  const { connectors, connect, status, error } = useConnect();

  return (
    <div>
      <hr></hr>
      <h2>Connect</h2>
      <Flex gap='10px'>
        {account.status === 'disconnected' && (
          <Button
            onClick={() =>
              connect({
                connector: metaMaskSDKConnector,
                chainId,
              })
            }
            type='button'
          >
            Connect
          </Button>
        )}
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector, chainId })}
            type='button'
          >
            {connector.name}-{connector.id}
          </Button>
        ))}
      </Flex>
      <div>status: {status}</div>
      <div>error: {error?.message}</div>
      <hr></hr>
    </div>
  );

  // return (
  //   <div>Connect</div>
  // );
}
