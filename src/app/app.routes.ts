import { Routes } from '@angular/router';

const routeConfig: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (mod) => mod.ProductsComponent
      ),
  },
  {
    path: 'products/:code',
    loadComponent: () =>
      import(
        './components/products/product-detail/product-detail.component'
      ).then((mod) => mod.ProductDetailComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/orders/orders.component').then(
        (mod) => mod.OrdersComponent
      ),
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./components/customers/customers.component').then(
        (mod) => mod.CustomersComponent
      ),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./components/reports/reports.component').then(
        (mod) => mod.ReportsComponent
      ),
  },
];

export default routeConfig;
