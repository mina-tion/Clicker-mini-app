import { AuthorizationTelegramMiniParams } from '@core/types/AuthorizationTelegramMiniParams';
import { TelegramMiniAuthResponse } from '@core/types/response/auth/TelegramMiniAuthResponse';
import { AxiosInstance } from 'axios';

export class Authentication {
  constructor(private httpClient: AxiosInstance) {
  }

  public async getAuthTelegramMini({ authData, referralData }: AuthorizationTelegramMiniParams): Promise<TelegramMiniAuthResponse> {
    const config = {
      params: { validationData: authData, referralData },
    };

    const response = await this.httpClient.get<TelegramMiniAuthResponse>('auth/telegram/mini', config);

    return response.data;
  }
}
