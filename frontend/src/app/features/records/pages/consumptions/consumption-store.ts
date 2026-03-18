import {signalStore, withState} from '@ngrx/signals';
import {Record} from '../../../../core/models/record.model';


export const ConsumptionStore = signalStore(
  {providedIn: 'root'},

  withState({
    records: [] as Record[]
  }),

)
