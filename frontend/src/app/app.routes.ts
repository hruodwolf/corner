import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'records',
    pathMatch: 'full',
  },
  {
    path: 'records',
    loadComponent: () =>
      import('./features/records/pages/records/records').then(
        (m) => m.Records
      ),
  },
  {
    path: 'records/add',
    loadComponent: () =>
      import('./features/records/pages/add-record/add-record').then(
        (m) => m.AddRecord
      ),
  },
  {
    path: 'record-categories',
    loadComponent: () =>
      import('./features/record-categories/pages/record-categories/record-categories').then(
        (m) => m.RecordCategories
      ),
  },
  {
    path: 'measurement-units',
    loadComponent: () =>
      import('./features/measurement-units/pages/measurement-units/measurement-units').then(
        (m) => m.MeasurementUnits
      ),
  },
  {
    path: 'measurement-units-asyncpipe',
    loadComponent: () =>
      import('./features/measurement-units/pages/measurement-units-asyncpipe/measurement-units-asyncpipe').then(
        (m) => m.MeasurementUnitsAsyncpipe
      ),
  },
  {
    path: 'measurement-units-subscribe',
    loadComponent: () =>
      import('./features/measurement-units/pages/measurement-units-subscribe/measurement-units-subscribe').then(
        (m) => m.MeasurementUnitsSubscribe
      ),
  },
  {
    path: 'measurement-units-asyncawait',
    loadComponent: () =>
      import('./features/measurement-units/pages/measurement-units-asyncawait/measurement-units-asyncawait').then(
        (m) => m.MeasurementUnitsAsyncawait
      ),
  },
  {
    path: 'record-list',
    loadComponent: () =>
      import('./features/records/pages/record-list/record-list').then(
        (m) => m.RecordList
      ),
  },
  {
    path: 'measurement-units-signalstore',
    loadComponent: () =>
      import('./features/measurement-units/pages/measurement-units-signalstore/measurement-units-signalstore').then(
        (m) => m.MeasurementUnitsSignalstore
      ),
  },
  {
    path: 'consumptions',
    loadComponent: () =>
      import('./features/records/pages/consumptions/consumptions').then(
        (m) => m.Consumptions
      ),
  },

];
