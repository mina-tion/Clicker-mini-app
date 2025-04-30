import { AddUserPointsParams } from '@core/types/AddUserPointsParams';
import {
  GameConfigResponse
} from '@core/types/response/game/GameConfigResponse.ts';
import { AddUserPointsResponse } from '@core/types/response/user-points/AddUserPointsResponse';
import { AxiosInstance } from 'axios';

export class UserPoints {
  constructor(private httpClient: AxiosInstance) {
  }

  public async getConfig(): Promise<GameConfigResponse> {
    const response = await this.httpClient.get<GameConfigResponse>('/user-points/config');
    return response.data;
  }

  public async addUserPoints({ points }: AddUserPointsParams): Promise<AddUserPointsResponse> {
    const config = {
      points,
    };

    const response = await this.httpClient.post<AddUserPointsResponse>('/user-points/add-user-points', config);

    return response.data;
  }
}
