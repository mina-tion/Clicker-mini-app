import { Button, Flex, Input, Spinner } from '@chakra-ui/react';
import { useClaimAirdrop } from '@core/hooks/useClaimAirdrop';
import { storeMobx } from '@core/store/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useAccount } from 'wagmi';

export const Claim = observer(() => {
  const { rewards } = storeMobx;
  const { signRewardStatus, errorMessage, updateClaimStatusStatus } = rewards;
  const account = useAccount();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    doClaimAirdrop,
    // isPending,
    isProcessing,
    // isSuccess,
    isRejected,
    isError,
    // explorerUrl,
  } = useClaimAirdrop(storeMobx);
  const [questId, setQuestId] = useState('1000');

  const isLoading =
    signRewardStatus === 'LOADING' ||
    updateClaimStatusStatus === 'LOADING' ||
    isProcessing;

  const handleClaim = async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('receive_token');
    doClaimAirdrop(questId, token);
  };

  const handleRejectClaim = async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('receive_token');
    rewards.updateClaimStatus({ questId, token, status: 'Rejected' });
    rewards.reset();
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && account.status === 'connected' && (
        <Flex flexDirection='column' gap='10px'>
          <hr></hr>
          <Flex gap='5px' alignItems='center'>
            <div>questId:</div>
            <Input
              w='100px'
              placeholder='questId'
              value={questId}
              onChange={(event) => setQuestId(event.target.value)}
            />
            <Button onClick={handleClaim}>Claim</Button>
          </Flex>
          {signRewardStatus === 'REJECTED' && <div>Error: {errorMessage}</div>}
          {isRejected && 'Claim rejected'}
          {isError && 'Error while Claim'}
          <Button onClick={handleRejectClaim}>Reject Claim</Button>
          <hr></hr>
        </Flex>
      )}
    </>
  );
});
