import { ClaimStatus } from '@core/constants/ClaimStatuses';

export type UpdateClaimStatusParams = {
  token: string;
  questId: string;
  status: ClaimStatus;
};
