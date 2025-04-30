import refProgAbi from '@chaindata/abi/referralProgram.json';
import contracts from '@chaindata/contracts';
import { SignRewardResponse } from '@core/types/response/rewards/SignRewardResponse';
import { Hex, parseSignature } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export function useClaimReward(chainId?: number) {
  const {
    writeContract,
    data: hashTx,
    isIdle: isIdleContract,
    isPending: isPendingContract,
    isSuccess: isSuccessContract,
    isError: isErrorContract,
    error: contractError,
    failureReason: failureReasonContract,
  } = useWriteContract();

  const {
    data: receiptTx,
    isSuccess: isSuccessReceipt,
    isError: isErrorReceipt,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: hashTx,
  });

  function call(signClaim: SignRewardResponse) {
    if (!chainId) {
      console.error('ChainId is empty');

      return {
        isError: true,
        error: new Error('ChainIdis empty'),
      };
    }

    if (!signClaim.signature) {
      console.error('Signature is missing');

      return {
        isError: true,
        error: new Error('Invalid signature'),
      };
    }
    const params = {
      whiteLabelVault: signClaim.vaultAddress,
      userId: signClaim.userId,
      timestamp: signClaim.timestamp,
      questId: signClaim.questId,
      amount: signClaim.amount,
    };
    let signature;
    try {
      signature = parseSignature(signClaim.signature as Hex);
    } catch (error) {
      console.error('Failed to parse signature:', error);

      return {
        isError: true,
        error,
      };
    }
    const args = [params, signature];

    return writeContract({
      abi: refProgAbi.abi,
      address: contracts.referralProgram[chainId],
      functionName: 'claimReward',
      args,
      chainId,
    });
  }

  const isRejected = (() => {
    return (
      isErrorContract &&
      (failureReasonContract as { cause?: { name: string } })?.cause?.name ===
        'UserRejectedRequestError'
    );
  })();

  return {
    call,
    hashTx,
    receiptTx,
    isIdle: isIdleContract,
    isPending:
      isPendingContract ||
      (!isErrorContract &&
        !isSuccessContract &&
        !isSuccessReceipt &&
        !isErrorReceipt),
    isSuccess: isSuccessContract && isSuccessReceipt,
    isRejected,
    isError: !isRejected && (isErrorContract || isErrorReceipt),
    error: isErrorContract
      ? contractError
      : isErrorReceipt
        ? receiptError
        : undefined,
  };
}
