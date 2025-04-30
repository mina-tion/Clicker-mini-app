import { Center } from '@chakra-ui/react';
import { formatNumberFromHex, formatEtherFromHex } from '@core/utils/hexFormats';
import { useSDK } from '@metamask/sdk-react';

export const ShowSDKParams = () => {
  const { connected, chainId, account, balance, balanceProcessing } = useSDK();
  const {sdk: _0, readOnlyCalls: _1, provider: _2, rpcHistory: _3, ...sdkParams } = useSDK(); 

  return (
    <Center>
      <div>
        <p>{`Connected chain: ${chainId && formatNumberFromHex(chainId)}`}</p>
        <p>{`Connected account: ${account}`}</p>
        <p>{`Account balance: ${balanceProcessing ? '...' : balance && formatEtherFromHex(balance)}`}</p>
        <p>{`Connected: ${connected}`}</p>
        <hr style={{paddingTop: '20px', marginTop: '20px'}} />
        {Object.entries(sdkParams).map(([key, value]) => {
          return (
            <p key={key} style={{maxWidth: '200px'}}>{key}: {JSON.stringify(value)}</p>
          );
        })}
      </div>
    </Center>
  );
};
