import { Api } from '@core/helpers/api/Api';
import { GuidesListParams } from '@core/types/GuidesListParams.ts';
import {
  GuidesListResponse
} from '@core/types/response/earn/GuidesListResponse.ts';
import { makeAutoObservable } from 'mobx';

export class GuidesStore {
  list?: GuidesListResponse;

  constructor(private api: Api) {
    makeAutoObservable(this,{}, { autoBind: true });
  }

  public *getList({ language }: GuidesListParams) {
    try {
      this.list = yield this.api.quest.getAll({ language });
    } catch (error) {
      console.error('[GUIDES:STORE:GET_LIST] Error :', error);
    }
  }
}
