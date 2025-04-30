import { Api } from '@core/helpers/api/Api';
import {
  ReferralsListResponse
} from '@core/types/response/referrals/ReferralsListResponse.ts';
import { makeAutoObservable } from 'mobx';

export class ReferralsStore {
  link?: string;
  list?: ReferralsListResponse;

  constructor(private api: Api) {
    makeAutoObservable(this,{}, { autoBind: true });
  }

  public *getList() {
    try {
      this.list = yield this.api.referrals.getAll();
    } catch (error) {
      console.error('[REFERRALS:STORE:GET_LIST] Error :', error);
    }
  }

  public *getRefLink() {
    try {
      this.link = yield this.api.user.getRefLink();
    } catch (error) {
      console.error('[REFERRALS:STORE:GET_LINK] Error :', error);
    }
  }
}
