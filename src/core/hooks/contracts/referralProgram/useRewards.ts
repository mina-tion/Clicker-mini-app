import refProgAbi from '@chaindata/abi/referralProgram.json';
import contracts from '@chaindata/contracts';
import { useReadContract } from 'wagmi';

export function useRewards(chainId: number, walletAddress: string) {
  console.log('chain id : ', chainId);
  console.log('walletAddress : ', walletAddress);

  const { data, isSuccess, isError, error } = useReadContract({
    abi: refProgAbi.abi,
    address: contracts.referralProgram[chainId],
    functionName: 'devRewards',
    chainId: chainId,
    args: walletAddress ? [walletAddress] : undefined,
  });

  return {
    data,
    isSuccess,
    isError,
    error,
  };
}
