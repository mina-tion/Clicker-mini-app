import { TelegramMiniApp } from '@core/types/TelegramMiniApp';
import WebApp from '@twa-dev/sdk';
import { makeAutoObservable } from 'mobx';

export class TelegramMiniAppStore {
  telegramMiniApp: TelegramMiniApp  = WebApp;

  get initData() {
    return this.telegramMiniApp.initData;
  }

  get initDataUnsafe() {
    return this.telegramMiniApp.initDataUnsafe;
  }

  get platform() {
    return this.telegramMiniApp.platform;
  }

  constructor() {
    makeAutoObservable(this,{}, { autoBind: true });
  }

  public getBackButton() {
    return this.telegramMiniApp.BackButton;
  }

  public hapticFeedback(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') {
    this.telegramMiniApp.HapticFeedback.impactOccurred(style);
  }

  public openLink(url: string) {
    this.telegramMiniApp.openLink(url);
  }

  public openTelegramLink(url: string) {
    this.telegramMiniApp.openTelegramLink(url);
  }
}
