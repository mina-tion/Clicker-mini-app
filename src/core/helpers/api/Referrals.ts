import {
  ReferralsListResponse
} from '@core/types/response/referrals/ReferralsListResponse.ts';
import { AxiosInstance } from 'axios';

export class Referrals {
  constructor(private httpClient: AxiosInstance) {
  }

  public async getAll(): Promise<ReferralsListResponse> {
    const response = await this.httpClient.get<ReferralsListResponse>('referrals/find-all');
    return response.data;
  }
}
