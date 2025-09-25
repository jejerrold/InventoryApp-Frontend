import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  dataSource = new MatTableDataSource<Order>();

  displayedColumns: string[] = [
    'orderNumber',
    'customer',
    'status',
    'priority',
    'orderDate',
    'totalAmount',
    'paymentStatus',
    'actions',
  ];

  // Stats
  totalOrders = 0;
  pendingOrders = 0;
  completedOrders = 0;
  totalRevenue = 0;

  // Filters
  searchTerm = '';
  statusFilter = 'all';
  priorityFilter = 'all';

  ngOnInit() {
    this.loadOrders();
    this.calculateStats();
  }

  loadOrders() {
    // Sample Filipino orders data
    this.orders = [
      {
        id: 'ORD-001',
        orderNumber: 'ORD-2024-001',
        customerId: 'CUST-001',
        customerName: 'Maria Santos',
        customerEmail: 'maria.santos@email.com',
        customerPhone: '+63 917 123 4567',
        status: 'pending',
        priority: 'high',
        orderDate: new Date('2024-01-15'),
        expectedDeliveryDate: new Date('2024-01-20'),
        shippingAddress: {
          street: '123 Rizal Avenue, Poblacion',
          city: 'Makati',
          state: 'Metro Manila',
          zipCode: '1200',
          country: 'Philippines',
        },
        items: [
          {
            id: 'ITEM-001',
            productId: 'PROD-001',
            productName: 'Premium Coffee Beans',
            productSku: 'PCB-001',
            quantity: 5,
            unitPrice: 2500.0,
            totalPrice: 12500.0,
          },
          {
            id: 'ITEM-002',
            productId: 'PROD-002',
            productName: 'Organic Tea Set',
            productSku: 'OTS-001',
            quantity: 2,
            unitPrice: 1625.0,
            totalPrice: 3250.0,
          },
        ],
        subtotal: 15750.0,
        shippingCost: 0,
        taxAmount: 0,
        totalAmount: 15750.0,
        paymentMethod: 'gcash',
        paymentStatus: 'pending',
        shippingMethod: 'express',
        trackingNumber: undefined,
        notes: 'Customer requested fast delivery',
        createdBy: 'admin',
      },
      {
        id: 'ORD-002',
        orderNumber: 'ORD-2024-002',
        customerId: 'CUST-002',
        customerName: 'Juan dela Cruz',
        customerEmail: 'juan.delacruz@email.com',
        customerPhone: '+63 918 987 6543',
        status: 'processing',
        priority: 'normal',
        orderDate: new Date('2024-01-14'),
        expectedDeliveryDate: new Date('2024-01-18'),
        shippingAddress: {
          street: '456 Bonifacio Street, San Miguel',
          city: 'Quezon City',
          state: 'Metro Manila',
          zipCode: '1100',
          country: 'Philippines',
        },
        items: [
          {
            id: 'ITEM-003',
            productId: 'PROD-003',
            productName: 'Laptop Stand',
            productSku: 'LS-001',
            quantity: 1,
            unitPrice: 4500.0,
            totalPrice: 4500.0,
          },
          {
            id: 'ITEM-004',
            productId: 'PROD-004',
            productName: 'Wireless Mouse',
            productSku: 'WM-001',
            quantity: 2,
            unitPrice: 2225.0,
            totalPrice: 4450.0,
          },
        ],
        subtotal: 8950.0,
        shippingCost: 0,
        taxAmount: 0,
        totalAmount: 8950.0,
        paymentMethod: 'credit_card',
        paymentStatus: 'paid',
        shippingMethod: 'standard',
        trackingNumber: 'TRK-2024-002',
        notes: 'Gift wrapping requested',
        createdBy: 'admin',
      },
      {
        id: 'ORD-003',
        orderNumber: 'ORD-2024-003',
        customerId: 'CUST-003',
        customerName: 'Ana Reyes',
        customerEmail: 'ana.reyes@email.com',
        customerPhone: '+63 919 456 7890',
        status: 'shipped',
        priority: 'urgent',
        orderDate: new Date('2024-01-12'),
        expectedDeliveryDate: new Date('2024-01-15'),
        shippingAddress: {
          street: '789 Mabini Avenue, Malate',
          city: 'Manila',
          state: 'Metro Manila',
          zipCode: '1004',
          country: 'Philippines',
        },
        items: [
          {
            id: 'ITEM-005',
            productId: 'PROD-005',
            productName: 'Smart Watch',
            productSku: 'SW-001',
            quantity: 1,
            unitPrice: 18500.0,
            totalPrice: 18500.0,
          },
          {
            id: 'ITEM-006',
            productId: 'PROD-006',
            productName: 'Phone Case',
            productSku: 'PC-001',
            quantity: 4,
            unitPrice: 1700.0,
            totalPrice: 6800.0,
          },
        ],
        subtotal: 25300.0,
        shippingCost: 0,
        taxAmount: 0,
        totalAmount: 25300.0,
        paymentMethod: 'bank_transfer',
        paymentStatus: 'paid',
        shippingMethod: 'overnight',
        trackingNumber: 'TRK-2024-003',
        notes: 'Express delivery',
        createdBy: 'admin',
      },
      {
        id: 'ORD-004',
        orderNumber: 'ORD-2024-004',
        customerId: 'CUST-004',
        customerName: 'Carlos Mendoza',
        customerEmail: 'carlos.mendoza@email.com',
        customerPhone: '+63 920 111 2233',
        status: 'delivered',
        priority: 'low',
        orderDate: new Date('2024-01-10'),
        expectedDeliveryDate: new Date('2024-01-14'),
        actualDeliveryDate: new Date('2024-01-13'),
        shippingAddress: {
          street: '321 Aguinaldo Highway, Dasmarinas',
          city: 'Cavite',
          state: 'Cavite',
          zipCode: '4114',
          country: 'Philippines',
        },
        items: [
          {
            id: 'ITEM-007',
            productId: 'PROD-007',
            productName: 'Bluetooth Speaker',
            productSku: 'BS-001',
            quantity: 2,
            unitPrice: 6225.0,
            totalPrice: 12450.0,
          },
        ],
        subtotal: 12450.0,
        shippingCost: 0,
        taxAmount: 0,
        totalAmount: 12450.0,
        paymentMethod: 'paymaya',
        paymentStatus: 'paid',
        shippingMethod: 'standard',
        trackingNumber: 'TRK-2024-004',
        notes: 'Delivered successfully',
        createdBy: 'admin',
      },
      {
        id: 'ORD-005',
        orderNumber: 'ORD-2024-005',
        customerId: 'CUST-005',
        customerName: 'Sofia Garcia',
        customerEmail: 'sofia.garcia@email.com',
        customerPhone: '+63 921 444 5566',
        status: 'cancelled',
        priority: 'normal',
        orderDate: new Date('2024-01-08'),
        expectedDeliveryDate: new Date('2024-01-12'),
        shippingAddress: {
          street: '654 Magsaysay Avenue, Baguio',
          city: 'Baguio',
          state: 'Benguet',
          zipCode: '2600',
          country: 'Philippines',
        },
        items: [
          {
            id: 'ITEM-008',
            productId: 'PROD-008',
            productName: 'Winter Jacket',
            productSku: 'WJ-001',
            quantity: 1,
            unitPrice: 7850.0,
            totalPrice: 7850.0,
          },
        ],
        subtotal: 7850.0,
        shippingCost: 0,
        taxAmount: 0,
        totalAmount: 7850.0,
        paymentMethod: 'credit_card',
        paymentStatus: 'refunded',
        shippingMethod: 'standard',
        trackingNumber: undefined,
        notes: 'Customer changed mind, refund processed',
        createdBy: 'admin',
      },
    ];

    this.applyFilters();
  }

  calculateStats() {
    this.totalOrders = this.orders.length;
    this.pendingOrders = this.orders.filter(
      (o) => o.status === 'pending'
    ).length;
    this.completedOrders = this.orders.filter(
      (o) => o.status === 'delivered'
    ).length;
    this.totalRevenue = this.orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.totalAmount, 0);
  }

  applyFilters() {
    this.filteredOrders = this.orders.filter((order) => {
      const matchesSearch =
        !this.searchTerm ||
        order.orderNumber
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        order.customerName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        order.customerEmail
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        (order.trackingNumber &&
          order.trackingNumber
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()));

      const matchesStatus =
        this.statusFilter === 'all' || order.status === this.statusFilter;
      const matchesPriority =
        this.priorityFilter === 'all' || order.priority === this.priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    this.dataSource.data = this.filteredOrders;
  }

  applySearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters();
  }

  applyStatusFilter(value: string) {
    this.statusFilter = value;
    this.applyFilters();
  }

  applyPriorityFilter(value: string) {
    this.priorityFilter = value;
    this.applyFilters();
  }

  // Order management methods
  addOrder() {
    console.log('Add new order');
    // TODO: Implement add order dialog
  }

  viewOrder(order: Order) {
    console.log('View order:', order);
    // TODO: Implement order details dialog
  }

  editOrder(order: Order) {
    console.log('Edit order:', order);
    // TODO: Implement edit order dialog
  }

  printOrder(order: Order) {
    console.log('Print order:', order);
    // TODO: Implement print functionality
  }

  trackOrder(order: Order) {
    console.log('Track order:', order);
    // TODO: Implement tracking dialog
  }

  contactCustomer(order: Order) {
    console.log('Contact customer for order:', order);
    // TODO: Implement contact customer functionality
  }

  deleteOrder(order: Order) {
    console.log('Cancel order:', order);
    // TODO: Implement order cancellation
  }

  // Utility methods
  getStatusColor(status: string): string {
    switch (status) {
      case 'delivered':
        return 'primary';
      case 'shipped':
        return 'accent';
      case 'processing':
        return 'warn';
      case 'confirmed':
        return 'primary';
      case 'pending':
        return '';
      case 'cancelled':
        return 'warn';
      default:
        return '';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'urgent':
        return 'warn';
      case 'high':
        return 'accent';
      case 'normal':
        return 'primary';
      case 'low':
        return '';
      default:
        return '';
    }
  }

  getPaymentStatusColor(status: string): string {
    switch (status) {
      case 'paid':
        return 'primary';
      case 'pending':
        return 'accent';
      case 'failed':
        return 'warn';
      case 'refunded':
        return '';
      default:
        return '';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  exportOrders(): void {
    console.log('Export orders data');
    // TODO: Implement export functionality
  }

  printOrders(): void {
    console.log('Print all orders');
    // TODO: Implement print all orders functionality
  }
}
