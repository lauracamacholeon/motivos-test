import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'motivos',
    pathMatch: 'full',
  },
  {
    path: 'motivos',
    loadComponent: () =>
      import('./features/motivos/motivos-list/motivos-list.component').then(
        (c) => c.MotivosListComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'motivos',
  },
];
