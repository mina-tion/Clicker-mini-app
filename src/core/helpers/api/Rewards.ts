import { SignRewardParams } from '@core/types/SignRewardParams';
import { UpdateClaimStatusParams } from '@core/types/response/claims/UpdateClaimStatusParams';
import { SignRewardResponse } from '@core/types/response/rewards/SignRewardResponse';
import { AxiosInstance } from 'axios';

export class Rewards {
  constructor(private httpClient: AxiosInstance) {}

  public async signRewards({
    questId,
    token,
  }: SignRewardParams): Promise<SignRewardResponse> {
    const data = {
      captchaToken: token,
      questId,
    };

    const response = await this.httpClient.post<SignRewardResponse>(
      '/rewards/claim',
      data,
    );

    return response.data;
  }

  public async updateClaimStatus({
    token,
    questId,
    status,
  }: UpdateClaimStatusParams) {
    const response = await this.httpClient.post<SignRewardResponse>(
      `/claim/questId/${questId}/status`,
      null,
      {
        params: { token, status },
      },
    );

    return response.data;
  }
}
