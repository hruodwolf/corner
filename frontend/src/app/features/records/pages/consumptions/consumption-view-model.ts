import {inject, Injectable} from '@angular/core';
import {ConsumptionStore} from './consumption-store';

@Injectable()
export class ConsumptionViewModel {
  private store = inject(ConsumptionStore);

  //Raw data from store
  records = this.store.records;

}
