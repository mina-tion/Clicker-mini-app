import { RequestStatus, RequestStatuses } from '@core/constants/Statuses.ts';
import { Api } from '@core/helpers/api/Api';
import { AuthorizationTelegramMiniParams } from '@core/types/AuthorizationTelegramMiniParams';
import { TelegramMiniAuthResponse } from '@core/types/response/auth/TelegramMiniAuthResponse';

import { makeAutoObservable } from 'mobx';

export class AuthStore {
  private telegramMiniAuthResponse?: TelegramMiniAuthResponse;

  public authStatus?: RequestStatus;
  public hasError = false;

  get authToken() {
    return this.telegramMiniAuthResponse?.token;
  }

  get isAuthorized() {
    return !!this.authToken;
  }

  constructor(private api: Api) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public *getAuthToken(params: AuthorizationTelegramMiniParams) {
    this.authStatus = RequestStatuses.LOADING;
    this.hasError = false;
    try {
      this.telegramMiniAuthResponse =
        yield this.api.authentication.getAuthTelegramMini(params);
      this.authStatus = RequestStatuses.RESOLVED;
    } catch (error) {
      this.hasError = true;
      this.authStatus = RequestStatuses.REJECTED;
      console.error('[AUTH:STORE:GET_AUTH_TOKEN] Error :', error);
    }
  }
}
