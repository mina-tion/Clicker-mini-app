import { RequestStatus, RequestStatuses } from '@core/constants/Statuses';
import { Api } from '@core/helpers/api/Api';
import { SignRewardParams } from '@core/types/SignRewardParams';
import { UpdateClaimStatusParams } from '@core/types/response/claims/UpdateClaimStatusParams';
import { ResponseState } from '@core/types/response/response-state';
import { SignRewardResponse } from '@core/types/response/rewards/SignRewardResponse';
import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

export class RewardsStore {
  signReward?: SignRewardResponse;
  signRewardStatus: RequestStatus = RequestStatuses.IDLE;

  updateClaimStatusStatus: RequestStatus = RequestStatuses.IDLE;

  get errorMessage(): string | undefined {
    return this.signReward?.state?.errorMessage;
  }

  constructor(private api: Api) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public reset() {
    this.signRewardStatus = RequestStatuses.IDLE;
    this.signReward = undefined;
  }

  public *signRewards(params: SignRewardParams) {
    try {
      this.signRewardStatus = RequestStatuses.LOADING;
      this.signReward = yield this.api.rewards.signRewards(params);
      if (this.signReward?.state?.type === 'SUCCESS') {
        this.signRewardStatus = RequestStatuses.RESOLVED;
      } else {
        this.signRewardStatus = RequestStatuses.REJECTED;
      }
    } catch (error) {
      this.signRewardStatus = RequestStatuses.REJECTED;
      this.signReward = {
        state: (error as AxiosError<ResponseState>).response?.data,
      } as SignRewardResponse;
      console.error('[REWARDS:STORE:SIGN_REWARDS] Error :', error);
    }
  }

  public *updateClaimStatus(params: UpdateClaimStatusParams) {
    try {
      this.updateClaimStatusStatus = RequestStatuses.LOADING;
      yield this.api.rewards.updateClaimStatus(params);
      this.updateClaimStatusStatus = RequestStatuses.RESOLVED;
    } catch (error) {
      this.updateClaimStatusStatus = RequestStatuses.REJECTED;
      console.error('[REWARDS:STORE:UPDATE_CLAIM_STATUS] Error :', error);
    }
  }
}
