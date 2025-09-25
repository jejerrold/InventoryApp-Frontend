import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    'customer',
    'contact',
    'status',
    'company',
    'joinDate',
    'totalOrders',
    'totalSpent',
    'actions',
  ];

  dataSource: MatTableDataSource<Customer>;
  customers: Customer[] = [
    {
      id: 'CUST001',
      firstName: 'Juan Carlos',
      lastName: 'Dela Cruz',
      email: 'juan.delacruz@techcorp.com',
      phone: '+63-917-123-4567',
      company: 'TechCorp Solutions',
      status: 'vip',
      address: {
        street: '123 Business Ave',
        city: 'Makati',
        state: 'Metro Manila',
        zipCode: '1226',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-01-15'),
      lastOrderDate: new Date('2024-09-20'),
      totalOrders: 28,
      totalSpent: 15750.5,
      creditLimit: 25000,
      notes: 'VIP customer with excellent payment history',
    },
    {
      id: 'CUST002',
      firstName: 'Maria Cristina',
      lastName: 'Santos',
      email: 'maria.santos@innovatetech.com',
      phone: '+63-917-123-4568',
      company: 'InnovateTech',
      status: 'active',
      address: {
        street: '456 Innovation Dr',
        city: 'Quezon City',
        state: 'Metro Manila',
        zipCode: '1101',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-03-22'),
      lastOrderDate: new Date('2024-09-18'),
      totalOrders: 15,
      totalSpent: 8920.75,
      creditLimit: 15000,
    },
    {
      id: 'CUST003',
      firstName: 'Miguel Angelo',
      lastName: 'Reyes',
      email: 'miguel.reyes@startupxyz.io',
      phone: '+63-917-123-4569',
      company: 'StartupXYZ',
      status: 'active',
      address: {
        street: '789 Startup Blvd',
        city: 'Taguig',
        state: 'Metro Manila',
        zipCode: '1630',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-05-10'),
      lastOrderDate: new Date('2024-09-15'),
      totalOrders: 12,
      totalSpent: 6450.25,
      creditLimit: 10000,
    },
    {
      id: 'CUST004',
      firstName: 'Ana Gabriela',
      lastName: 'Villanueva',
      email: 'ana.villanueva@designstudio.com',
      phone: '+63-917-123-4570',
      company: 'Creative Design Studio',
      status: 'active',
      address: {
        street: '321 Creative Way',
        city: 'Pasig',
        state: 'Metro Manila',
        zipCode: '1600',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-07-08'),
      lastOrderDate: new Date('2024-09-10'),
      totalOrders: 8,
      totalSpent: 4280.0,
      creditLimit: 8000,
    },
    {
      id: 'CUST005',
      firstName: 'David Emmanuel',
      lastName: 'Garcia',
      email: 'david.garcia@freelance.com',
      phone: '+63-917-123-4571',
      status: 'inactive',
      address: {
        street: '654 Home Office St',
        city: 'Mandaluyong',
        state: 'Metro Manila',
        zipCode: '1550',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-02-14'),
      lastOrderDate: new Date('2024-06-05'),
      totalOrders: 3,
      totalSpent: 1250.0,
      notes: 'Inactive - no orders in 3 months',
    },
    {
      id: 'CUST006',
      firstName: 'Luz Maria',
      lastName: 'Hernandez',
      email: 'luz.hernandez@mediagroup.com',
      phone: '+63-917-123-4572',
      company: 'Hernandez Media Group',
      status: 'vip',
      address: {
        street: '987 Media Plaza',
        city: 'Cebu City',
        state: 'Cebu',
        zipCode: '6000',
        country: 'Philippines',
      },
      dateCreated: new Date('2022-11-20'),
      lastOrderDate: new Date('2024-09-22'),
      totalOrders: 45,
      totalSpent: 32100.8,
      creditLimit: 50000,
      notes: 'Long-standing VIP customer',
    },
    {
      id: 'CUST007',
      firstName: 'Roberto Carlos',
      lastName: 'Mendoza',
      email: 'roberto.mendoza@logistics.com',
      phone: '+63-917-123-4573',
      company: 'Mendoza Logistics',
      status: 'active',
      address: {
        street: '147 Warehouse Rd',
        city: 'Davao City',
        state: 'Davao del Sur',
        zipCode: '8000',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-04-18'),
      lastOrderDate: new Date('2024-09-12'),
      totalOrders: 22,
      totalSpent: 11650.45,
      creditLimit: 20000,
    },
    {
      id: 'CUST008',
      firstName: 'Jennifer Mae',
      lastName: 'Cruz',
      email: 'jennifer.cruz@consulting.biz',
      phone: '+63-917-123-4574',
      company: 'Cruz Consulting',
      status: 'active',
      address: {
        street: '258 Business Center',
        city: 'Iloilo City',
        state: 'Iloilo',
        zipCode: '5000',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-06-12'),
      lastOrderDate: new Date('2024-09-08'),
      totalOrders: 18,
      totalSpent: 9875.3,
      creditLimit: 15000,
    },
    {
      id: 'CUST009',
      firstName: 'Christian Miguel',
      lastName: 'Torres',
      email: 'christian.torres@techstart.io',
      phone: '+63-917-123-4575',
      company: 'Torres TechStart Inc',
      status: 'active',
      address: {
        street: '369 Innovation Park',
        city: 'Baguio City',
        state: 'Benguet',
        zipCode: '2600',
        country: 'Philippines',
      },
      dateCreated: new Date('2023-08-25'),
      lastOrderDate: new Date('2024-09-19'),
      totalOrders: 9,
      totalSpent: 5440.75,
      creditLimit: 12000,
    },
    {
      id: 'CUST010',
      firstName: 'Amanda Isabel',
      lastName: 'Ramos',
      email: 'amanda.ramos@retailchain.com',
      phone: '+63-917-123-4576',
      company: 'Ramos Retail Chain',
      status: 'vip',
      address: {
        street: '741 Retail Plaza',
        city: 'Cagayan de Oro',
        state: 'Misamis Oriental',
        zipCode: '9000',
        country: 'Philippines',
      },
      dateCreated: new Date('2022-09-30'),
      lastOrderDate: new Date('2024-09-21'),
      totalOrders: 67,
      totalSpent: 48920.65,
      creditLimit: 75000,
      notes: 'High-volume retail customer',
    },
  ];

  filteredCustomers: Customer[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';
  typeFilter: string = 'all';

  // Statistics
  totalCustomers = 0;
  activeCustomers = 0;
  vipCustomers = 0;
  totalRevenue = 0;

  constructor() {
    this.dataSource = new MatTableDataSource(this.customers);
    this.filteredCustomers = [...this.customers];
  }

  ngOnInit(): void {
    this.calculateStatistics();
    this.applyFilters();
  }

  calculateStatistics(): void {
    this.totalCustomers = this.customers.length;
    this.activeCustomers = this.customers.filter(
      (c) => c.status === 'active'
    ).length;
    this.vipCustomers = this.customers.filter((c) => c.status === 'vip').length;
    this.totalRevenue = this.customers.reduce(
      (sum, c) => sum + c.totalSpent,
      0
    );
  }

  applySearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.applyFilters();
  }

  applyStatusFilter(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  applyTypeFilter(type: string): void {
    this.typeFilter = type;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.customers];

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(this.searchTerm) ||
          customer.lastName.toLowerCase().includes(this.searchTerm) ||
          customer.email.toLowerCase().includes(this.searchTerm) ||
          customer.company?.toLowerCase().includes(this.searchTerm) ||
          customer.phone.includes(this.searchTerm)
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(
        (customer) => customer.status === this.statusFilter
      );
    }

    // Apply type filter
    if (this.typeFilter !== 'all') {
      filtered = filtered.filter((customer) => {
        if (this.typeFilter === 'business') {
          return customer.company && customer.company.trim() !== '';
        } else if (this.typeFilter === 'individual') {
          return !customer.company || customer.company.trim() === '';
        }
        return true;
      });
    }

    this.filteredCustomers = filtered;
    this.dataSource.data = filtered;
  }

  getFullName(customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'vip':
        return 'primary';
      case 'active':
        return 'accent';
      case 'inactive':
        return 'warn';
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

  formatDate(date?: Date): string {
    if (!date) return 'Never';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  getDaysActive(createdDate: Date): number {
    const now = new Date();
    const timeDiff = now.getTime() - createdDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  // CRUD Operations
  addCustomer(): void {
    console.log('Add new customer');
    // Open add customer dialog
  }

  editCustomer(customer: Customer): void {
    console.log('Edit customer:', customer.id);
    // Open edit customer dialog
  }

  viewCustomer(customer: Customer): void {
    console.log('View customer details:', customer.id);
    // Navigate to customer detail page
  }

  deleteCustomer(customer: Customer): void {
    console.log('Delete customer:', customer.id);
    // Show confirmation dialog and delete
  }

  exportCustomers(): void {
    console.log('Export customer data');
    // Export functionality
  }

  sendEmail(customer: Customer): void {
    console.log('Send email to:', customer.email);
    // Email functionality
  }

  viewOrders(customer: Customer): void {
    console.log('View orders for:', customer.id);
    // Navigate to customer orders
  }

  callCustomer(customer: Customer): void {
    console.log('Call customer:', customer.phone);
    // Phone call functionality
  }

  toggleStatus(customer: Customer): void {
    console.log('Toggle status for customer:', customer.id);
    // Toggle customer active/inactive status
    customer.status = customer.status === 'active' ? 'inactive' : 'active';
    this.applyFilters();
    this.calculateStatistics();
  }
}
