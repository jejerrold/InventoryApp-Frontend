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
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (mod) => mod.OrdersComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './components/orders/create-order/create-order.component'
          ).then((mod) => mod.CreateOrderComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            './components/orders/order-details/order-details.component'
          ).then((mod) => mod.OrderDetailsComponent),
      },
      {
        path: 'tag/:orderId',
        loadComponent: () =>
          import(
            './components/orders/order-tag-references/order-tag-references.component'
          ).then((mod) => mod.OrderTagReferencesComponent),
      },
    ],
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
