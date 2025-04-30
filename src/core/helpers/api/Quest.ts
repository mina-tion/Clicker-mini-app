import { GuidesListParams } from '@core/types/GuidesListParams.ts';
import {
  GuidesListResponse
} from '@core/types/response/earn/GuidesListResponse.ts';
import {
  RecommendedGuideResponse
} from '@core/types/response/game/RecommendedGuideResponse.ts';
import { AxiosInstance } from 'axios';

export class Quest {
  constructor(private publicHttpClient: AxiosInstance, private httpClient: AxiosInstance) {
  }

  public async getAll({ language }: GuidesListParams): Promise<GuidesListResponse> {
    const config = {
      params: { language: language },
    };
    const response = await this.publicHttpClient.get<GuidesListResponse>('quest/all', config);
    return response.data;
  }

  public async getEarnMore(): Promise<RecommendedGuideResponse> {
    const response = await this.httpClient.get<RecommendedGuideResponse>('quest/earn-more');
    return response.data;
  }
}
