import { ResponseState } from '@core/types/response/response-state';

export type AddUserPointsResponse = {
  availablePoints: number;
  nextUpdateDate: string;
  responseState: ResponseState;
};
