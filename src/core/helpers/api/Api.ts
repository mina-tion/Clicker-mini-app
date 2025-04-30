import { Quest } from '@core/helpers/api/Quest.ts';
import { UserAction } from '@core/helpers/api/UserAction.ts';
import { httpClient, publicHttpClient } from '@core/utils/httpClient';
import { Authentication } from './Authentication';
import { Referrals } from './Referrals';
import { Rewards } from './Rewards';
import { User } from './User';
import { UserPoints } from './UserPoints';

export class Api {
  public readonly authentication = new Authentication(publicHttpClient);
  public readonly userPoints = new UserPoints(httpClient);
  public readonly user = new User(httpClient);
  public readonly quest = new Quest(publicHttpClient, httpClient);
  public readonly referrals = new Referrals(httpClient);
  public readonly rewards = new Rewards(httpClient);
  public readonly userAction = new UserAction(httpClient);
}

export const api = new Api();
