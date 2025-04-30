import { AxiosInstance } from 'axios';

export class User {
  constructor(private httpClient: AxiosInstance) {
  }

  public async getRefLink(): Promise<string> {
    const response = await this.httpClient.get<string>('user/mini-app/referral');
    return response.data;
  }
}
