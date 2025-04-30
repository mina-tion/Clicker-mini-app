import { ResponseState } from '@core/types/response/response-state';

export type TelegramMiniAuthResponse = {
  requestId: string,
  token: string,
  state: ResponseState
}
