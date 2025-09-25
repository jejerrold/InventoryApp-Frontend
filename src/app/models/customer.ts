export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'vip';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dateCreated: Date;
  lastOrderDate?: Date;
  totalOrders: number;
  totalSpent: number;
  creditLimit?: number;
  notes?: string;
}

export interface CustomerOrder {
  id: string;
  customerId: string;
  orderDate: Date;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: number;
}
