import {ClickerMultiplier} from '@core/types/ClickerMultiplier.ts';
import { ResponseState } from '@core/types/response/response-state';

export type GameConfigResponse = {
  availablePoints: number;
  nextUpdateDate: string;
  globalPoints: number;
  responseState: ResponseState;
  state: string;
  multiplier: ClickerMultiplier;
};
