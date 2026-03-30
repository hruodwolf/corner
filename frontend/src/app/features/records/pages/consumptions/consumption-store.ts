import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {Record} from '../../../../core/models/record.model';
import {computed, inject} from '@angular/core';
import {RecordService} from '../../services/record.service';


export const ConsumptionStore = signalStore(
  {providedIn: 'root'},

  withState({
    records: [] as Record[]
  }),

  withComputed(({records}) => ({
    countRecords: computed(() => records().length)
  })),

  withMethods((store) => {
    const recordService  = inject(RecordService);

    return {
      async loadRecords() {
        const records = await recordService.loadRecordsWithLastValueFrom()
        patchState(store, {records: records})
      }
    }
  }),

  //Once the store is instantiated, withHooks() fires and data is loaded.
  withHooks({
    onInit({loadRecords}) {
      loadRecords();
    },
    onDestroy() {
      console.log('on destroy');
    }
  })

)
