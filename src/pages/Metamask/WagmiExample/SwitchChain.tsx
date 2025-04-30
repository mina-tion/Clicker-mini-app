import { Button } from '@chakra-ui/react'
import { useChainId, useSwitchChain } from 'wagmi';

export function SwitchChain() {
  const chainId = useChainId();
  const { chains, switchChain, error } = useSwitchChain();

  return (
    <div>
      <hr></hr>
      <h2>Switch Chain</h2>

      {chains.map((chain) => (
        <Button
          disabled={chainId === chain.id}
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
          type="button"
        >
          {chain.name}
        </Button>
      ))}

      {error?.message}
      <hr></hr>
    </div>
  );

  // return (
  //   <>Switch Chain</>
  // );  
}
