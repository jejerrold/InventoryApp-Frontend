import { Routes } from '@angular/router';

const routeConfig: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent
      ),
  },
];

export default routeConfig;
