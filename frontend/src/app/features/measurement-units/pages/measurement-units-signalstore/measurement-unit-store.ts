import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {MeasurementUnit} from '../../../../core/models/measurement-unit.model';
import {computed, inject} from '@angular/core';
import {MeasurementUnitService} from '../../services/measurement-unit.service';
import {withLoading} from "./loading.feature";

export const MeasurementUnitStore = signalStore(
  {providedIn: 'root'},
  withState({
    measurementUnits: [] as MeasurementUnit[]
  }),

  withComputed(({measurementUnits}) => ({
    countMeasurementUnits: computed(() => measurementUnits().length)
  })),

  withLoading(),

  withMethods((store) => {
    const measurementUnitService = inject(MeasurementUnitService);

    return {
      async loadAllMeasurementUnits(){
        store.setLoading();
        const measurementUnits = await measurementUnitService.loadMeasurementUnitsWithLastValueFrom();
        patchState(store, {measurementUnits: measurementUnits})
        store.setCompleted();
      }
    }
  }),

  withHooks({
    onInit({loadAllMeasurementUnits}) {
      loadAllMeasurementUnits();
    },
    onDestroy() {
      console.log('on destroy');
    }
  })
);
