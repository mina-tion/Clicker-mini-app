import { RequestStatuses } from '@core/constants/Statuses';
import { useClaimReward } from '@core/hooks/contracts/referralProgram';
import { Store } from '@core/store/store';
import { useEffect, useState, useCallback } from 'react';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

type ClaimStatus = (typeof STATUS)[keyof typeof STATUS];

export function useClaimAirdrop(store: Store) {
  const { rewards } = store;
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  const [status, setStatus] = useState<ClaimStatus>(STATUS.IDLE);
  const isPendingClaim = status === STATUS.PENDING;
  const isProcessingClaim = status === STATUS.IN_PROGRESS;
  const isSuccessClaim = status === STATUS.SUCCESS;
  const isErrorClaim = status === STATUS.ERROR;

  const { signRewardStatus, signReward } = rewards;

  const {
    call: callClaimReward,
    hashTx,
    receiptTx,
    isIdle,
    isPending,
    isSuccess,
    isRejected,
    isError,
    error,
  } = useClaimReward(chainId);

  const explorerUrl = '';

  const doSignClaim = useCallback(
    (questId: string, token: string) => {
      setStatus(STATUS.PENDING);
      rewards.signRewards({ questId, token });
    },
    [rewards],
  );

  useEffect(() => {
    if (
      signRewardStatus === RequestStatuses.RESOLVED &&
      signReward &&
      signReward.networkId &&
      chainId !== signReward.networkId
    ) {
      setChainId(signReward.networkId);
    }
    if (signRewardStatus && signReward && chainId !== signReward.networkId) {
      setChainId(signReward.networkId);
    }
  }, [signRewardStatus, signReward, chainId]);

  // call contract after sign claim
  useEffect(() => {
    if (!isPendingClaim || !chainId || !signReward) {
      return;
    }

    callClaimReward(signReward);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPendingClaim, chainId, signReward]);
  // NOTE: we ignore: callClaimReward (it will new function by each render)

  // user has confirmed tx and tx is processing
  useEffect(() => {
    if (!hashTx) {
      return;
    }

    setStatus(STATUS.IN_PROGRESS);
  }, [hashTx]);

  // success
  useEffect(() => {
    if (isIdle || isPending || !isSuccess || !hashTx || !receiptTx) {
      return;
    }

    setStatus(STATUS.SUCCESS);
  }, [isIdle, isPending, isSuccess, hashTx, receiptTx]);

  // error
  useEffect(() => {
    if (isIdle || isPending || !isError) {
      return;
    }

    console.error('[CLAIM:AIRDROP:ERROR] Error : ', error?.message);
    setStatus(STATUS.ERROR);
  }, [isIdle, isPending, isError, error?.message]);

  return {
    doClaimAirdrop: doSignClaim,
    isPending: isPendingClaim,
    isProcessing: isProcessingClaim,
    isSuccess: isSuccessClaim,
    isRejected,
    isError: isErrorClaim,
    status,
    explorerUrl,
  };
}
