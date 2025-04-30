import { SendBannerParams } from '@core/types/SendBannerParams.ts';
import { ResponseState } from '@core/types/response/response-state.ts';
import { AxiosInstance } from 'axios';

export class UserAction {
  constructor(private httpClient: AxiosInstance) {
  }

  public async sendBanner({ type }: SendBannerParams): Promise<ResponseState> {
    const response = await this.httpClient.get<ResponseState>(`/user-action/banner/${type}`);
    return response.data;
  }

  public async isVisited(): Promise<boolean> {
    const response = await this.httpClient.get<boolean>('/user-action/visited-gydde');
    return response.data;
  }
}
