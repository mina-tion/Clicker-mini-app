import { Api } from '@core/helpers/api/Api';
import { GuidesStore } from '@core/store/GuidesStore.ts';
import { ReferralsStore } from '@core/store/ReferralsStore.ts';
import { AuthStore } from './AuthStore';
import { GameStore } from './GameStore.ts';
import { RewardsStore } from './RewardsStore.ts';
import { TelegramMiniAppStore } from './TelegramMiniAppStore';

export class Store {
  private readonly api = new Api();
  public readonly authorization = new AuthStore(this.api);
  public readonly game = new GameStore(this.api);
  public readonly telegram = new TelegramMiniAppStore();
  public readonly referrals = new ReferralsStore(this.api);
  public readonly guides = new GuidesStore(this.api);
  public readonly rewards = new RewardsStore(this.api);
}

export const storeMobx = new Store();
