import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  orderItems: OrderItem[] = [];

  // Customer selection
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  showCustomerModal = false;

  subtotal = 0;
  tax = 0;
  shipping = 0;
  total = 0;
  taxRate = 0.08; // 8% tax rate
  shippingRate = 10.0; // $10 flat shipping

  constructor(private fb: FormBuilder, private router: Router) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.email]],
      customerPhone: [''],
      orderDate: [new Date().toISOString().split('T')[0], Validators.required],
      shippingAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      zipCode: [''],
      orderNotes: [''],
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCustomers();
    this.addOrderItem();
  }

  loadProducts() {
    // Mock products data - replace with actual service call
    this.products = [
      { id: 1, name: 'Laptop Pro', price: 1299.99, stock: 10 },
      { id: 2, name: 'Wireless Mouse', price: 29.99, stock: 50 },
      { id: 3, name: 'USB-C Cable', price: 19.99, stock: 100 },
      { id: 4, name: 'Monitor 24"', price: 299.99, stock: 15 },
      { id: 5, name: 'Keyboard Mechanical', price: 89.99, stock: 25 },
    ];
    this.filteredProducts = [...this.products];
  }

  searchProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  addOrderItem() {
    const newItem: OrderItem = {
      productId: 0,
      productName: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    this.orderItems.push(newItem);
  }

  removeOrderItem(index: number) {
    this.orderItems.splice(index, 1);
    this.calculateTotals();
  }

  onProductSelect(index: number, productId: number) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      this.orderItems[index].productId = productId;
      this.orderItems[index].productName = product.name;
      this.orderItems[index].unitPrice = product.price;
      this.updateItemTotal(index);
    }
  }

  onQuantityChange(index: number, quantity: number) {
    if (quantity && quantity > 0) {
      this.orderItems[index].quantity = quantity;
      this.updateItemTotal(index);
    }
  }

  onPriceChange(index: number, price: number) {
    if (price && price >= 0) {
      this.orderItems[index].unitPrice = price;
      this.updateItemTotal(index);
    }
  }

  updateItemTotal(index: number) {
    const item = this.orderItems[index];
    item.total = item.quantity * item.unitPrice;
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.orderItems.reduce((sum, item) => sum + item.total, 0);
    this.tax = this.subtotal * this.taxRate;
    this.shipping = this.subtotal > 0 ? this.shippingRate : 0;
    this.total = this.subtotal + this.tax + this.shipping;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  onSubmit() {
    if (
      this.orderForm.valid &&
      this.orderItems.length > 0 &&
      this.hasValidOrderItems()
    ) {
      const orderData = {
        ...this.orderForm.value,
        items: this.orderItems.filter((item) => item.productId > 0),
        subtotal: this.subtotal,
        tax: this.tax,
        shipping: this.shipping,
        total: this.total,
      };

      console.log('Order Data:', orderData);
      // TODO: Send to backend service

      // Navigate back to orders list
      this.router.navigate(['/orders']);
    } else {
      console.log('Form is invalid or no valid items added');
      this.markFormGroupTouched();
    }
  }

  private hasValidOrderItems(): boolean {
    return this.orderItems.some(
      (item) => item.productId > 0 && item.quantity > 0
    );
  }

  private markFormGroupTouched(): void {
    Object.keys(this.orderForm.controls).forEach((key) => {
      this.orderForm.get(key)?.markAsTouched();
    });
  }

  saveAsDraft() {
    const draftData = {
      ...this.orderForm.value,
      items: this.orderItems,
      status: 'draft',
    };

    console.log('Draft saved:', draftData);
    // TODO: Save draft to backend or local storage
  }

  cancel() {
    this.router.navigate(['/orders']);
  }

  loadCustomers() {
    // Mock customer data - replace with actual service call
    this.customers = [
      {
        id: 1,
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '+63 917 123 4567',
        address: '123 Rizal Avenue, Makati',
      },
      {
        id: 2,
        name: 'Juan dela Cruz',
        email: 'juan.delacruz@email.com',
        phone: '+63 918 987 6543',
        address: '456 Bonifacio Street, Quezon City',
      },
      {
        id: 3,
        name: 'Ana Reyes',
        email: 'ana.reyes@email.com',
        phone: '+63 919 456 7890',
        address: '789 Mabini Avenue, Manila',
      },
      {
        id: 4,
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@email.com',
        phone: '+63 920 111 2233',
        address: '321 Aguinaldo Highway, Cavite',
      },
      {
        id: 5,
        name: 'Sofia Garcia',
        email: 'sofia.garcia@email.com',
        phone: '+63 921 444 5566',
        address: '654 Magsaysay Avenue, Baguio',
      },
    ];
    this.filteredCustomers = [...this.customers];
  }

  openCustomerModal() {
    this.showCustomerModal = true;
    this.filteredCustomers = [...this.customers];
  }

  closeCustomerModal() {
    this.showCustomerModal = false;
  }

  searchCustomers(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCustomers = this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm)
    );
  }

  selectCustomer(customer: Customer) {
    this.orderForm.patchValue({
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      shippingAddress: customer.address || '',
    });
    this.closeCustomerModal();
  }
}
