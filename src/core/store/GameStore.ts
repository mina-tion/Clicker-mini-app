import {RequestStatus, RequestStatuses} from '@core/constants/Statuses.ts';
import { Api } from '@core/helpers/api/Api';
import {AddUserPointsParams} from '@core/types/AddUserPointsParams.ts';
import {SendBannerParams} from '@core/types/SendBannerParams.ts';
import {
  GameConfigResponse
} from '@core/types/response/game/GameConfigResponse.ts';
import {
  RecommendedGuideResponse
} from '@core/types/response/game/RecommendedGuideResponse.ts';
import { makeAutoObservable } from 'mobx';

export class GameStore {
  gameConfig?: GameConfigResponse;
  isVisited?: boolean;
  recommendedGuide?: RecommendedGuideResponse;
  addUserPointsStatus?: RequestStatus;
  sendBannerStatus?: RequestStatus;

  constructor(private api: Api) {
    makeAutoObservable(this,{}, { autoBind: true });
  }

  public *getConfig() {
    try {
      this.gameConfig = yield this.api.userPoints.getConfig();
    } catch (error) {
      console.error('[GAME:STORE:GET_CONFIG] Error :', error);
    }
  }

  public *getIsVisited() {
    try {
      this.isVisited = yield this.api.userAction.isVisited();
    } catch (error) {
      console.error('[GAME:STORE:GET_IS_VISITED_ORIGIN] Error :', error);
    }
  }

  public *getRecommendedGuide() {
    try {
      this.recommendedGuide = yield this.api.quest.getEarnMore();
    } catch (error) {
      console.error('[GAME:STORE:GET_RECOMMENDED_GUIDE] Error :', error);
    }
  }


  public *sendBanner({ type }: SendBannerParams) {
    this.sendBannerStatus = RequestStatuses.LOADING;
    try {
      yield this.api.userAction.sendBanner({ type });
      this.sendBannerStatus = RequestStatuses.RESOLVED;
    } catch (error) {
      console.error('[GAME:STORE:SEND_BANNER] Error :', error);
      this.sendBannerStatus = RequestStatuses.REJECTED;
    }
  }
  
  public *addUserPoints({ points }: AddUserPointsParams) {
    this.addUserPointsStatus = RequestStatuses.LOADING;
    try {
      this.gameConfig = yield this.api.userPoints.addUserPoints({ points });
      this.addUserPointsStatus = RequestStatuses.RESOLVED;
    } catch (error) {
      console.error('[GAME:STORE:ADD_USER_POINTS] Error :', error);
      this.addUserPointsStatus = RequestStatuses.REJECTED;
    }
  }

  public resetStatuses() {
    this.addUserPointsStatus = undefined;
    this.sendBannerStatus = undefined;
  }
}
