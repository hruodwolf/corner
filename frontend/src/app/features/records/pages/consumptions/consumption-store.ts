import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {Record} from '../../../../core/models/record.model';
import {computed, inject} from '@angular/core';
import {RecordService} from '../../services/record.service';


export const ConsumptionStore = signalStore(
  {providedIn: 'root'},

  withState({
    records: [] as Record[]
  }),

  withComputed(({ records }) => ({
    recordsWithConsumption: computed(() => {
      const sorted = [...records()]
        .sort((a, b) =>
          new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
        );

      return sorted.map((record, index) => {
        if (index === 0) {
          return {
            ...record,
            consumption: 0
          };
        }

        const previous = sorted[index - 1];

        return {
          ...record,
          consumption: record.recordValue - previous.recordValue
        };
      });
    })
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
