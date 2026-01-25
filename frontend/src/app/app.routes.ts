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

];

