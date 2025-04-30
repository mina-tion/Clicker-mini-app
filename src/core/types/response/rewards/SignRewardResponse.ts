import { ResponseState } from '../response-state';

export type SignRewardResponse = {
  userId: number;
  networkId: number;
  vaultAddress: string;
  timestamp: number;
  walletAddress: string;
  amount: number;
  questId: number;
  signature: string;
  state: ResponseState;
};
