export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  orderDate: Date;
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer' | 'gcash' | 'paymaya';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'failed' | 'refunded';
  shippingMethod: 'standard' | 'express' | 'overnight' | 'pickup';
  trackingNumber?: string;
  notes?: string;
  createdBy: string;
  updatedAt?: Date;
}
