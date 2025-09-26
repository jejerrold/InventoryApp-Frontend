import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as QRCode from 'qrcode';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: string;
  priority: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdBy: string;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  loading = false;
  error: string | null = null;
  qrCodeDataUrl: string = '';
  statusOrder = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.loading = true;
    this.error = null;

    try {
      const orderId = this.route.snapshot.paramMap.get('id');

      if (!orderId) {
        this.error = 'Order ID not found';
        this.loading = false;
        return;
      }

      // Mock order data - replace with actual service call
      this.order = {
        id: orderId,
        orderNumber: 'ORD-2024-001',
        customerId: 'CUST-001',
        customerName: 'Maria Santos',
        customerEmail: 'maria.santos@email.com',
        customerPhone: '+63 917 123 4567',
        status: 'processing',
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
        paymentStatus: 'paid',
        shippingMethod: 'express',
        trackingNumber: 'TRK-2024-001',
        notes: 'Customer requested fast delivery',
        createdBy: 'admin',
      };

      // Generate QR code after loading order
      this.generateQRCode();

      this.loading = false;
    } catch (error) {
      console.error('Error loading order details:', error);
      this.error = 'Failed to load order details';
      this.loading = false;
    }
  }

  async generateQRCode() {
    if (!this.order) return;

    try {
      // Check if running in browser
      let baseUrl = '';
      if (isPlatformBrowser(this.platformId)) {
        baseUrl =
          this.document.defaultView?.location?.origin ||
          'http://localhost:4200';
      } else {
        baseUrl = 'http://localhost:4200'; // fallback for SSR
      }

      // Use the correct route path with query parameters
      const orderUrl = `${baseUrl}/InventoryApp-Frontend/orders/tag-references?orderId=${this.order.id}`;
      console.log('Generated QR URL:', orderUrl); // Debug log

      const qrOptions: QRCode.QRCodeToDataURLOptions = {
        errorCorrectionLevel: 'M',
        type: 'image/png' as const,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        width: 120,
      };

      this.qrCodeDataUrl = await QRCode.toDataURL(orderUrl, qrOptions);
    } catch (error) {
      console.error('Error generating QR code:', error);
      this.qrCodeDataUrl = '';
    }
  }

  getQRCodeSVG(): SafeHtml {
    if (!this.qrCodeDataUrl) {
      return this.sanitizer.bypassSecurityTrustHtml(`
        <div class="qr-loading">
          <span>Generating QR...</span>
        </div>
      `);
    }

    return this.sanitizer.bypassSecurityTrustHtml(`
      <img src="${this.qrCodeDataUrl}" alt="Order QR Code" style="width: 100%; height: auto;" />
    `);
  }

  goBack() {
    this.location.back();
  }

  editOrder() {
    if (this.order) {
      this.router.navigate(['/orders', this.order.id, 'edit']);
    }
  }

  printOrder() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.defaultView?.print();
    }
  }

  updateStatus(newStatus: string) {
    if (
      this.order &&
      confirm(`Are you sure you want to update status to ${newStatus}?`)
    ) {
      this.order.status = newStatus;
      console.log(`Order status updated to: ${newStatus}`);
      // TODO: Call backend service to update status
    }
  }

  cancelOrder() {
    if (this.order && confirm('Are you sure you want to cancel this order?')) {
      this.order.status = 'cancelled';
      console.log('Order cancelled');
      // TODO: Call backend service to cancel order
    }
  }

  contactCustomer() {
    if (this.order && isPlatformBrowser(this.platformId)) {
      const subject = `Regarding Order ${this.order.orderNumber}`;
      const mailtoLink = `mailto:${
        this.order.customerEmail
      }?subject=${encodeURIComponent(subject)}`;

      if (this.document.defaultView) {
        this.document.defaultView.open(mailtoLink);
      }
    }
  }

  trackShipment() {
    if (this.order?.trackingNumber) {
      console.log(`Tracking shipment: ${this.order.trackingNumber}`);
      // TODO: Implement tracking functionality
      alert(`Tracking number: ${this.order.trackingNumber}`);
    }
  }

  isStatusActive(status: string): boolean {
    if (!this.order) return false;
    return this.order.status === status;
  }

  isStatusCompleted(status: string): boolean {
    if (!this.order) return false;
    const currentIndex = this.statusOrder.indexOf(this.order.status);
    const statusIndex = this.statusOrder.indexOf(status);
    return currentIndex > statusIndex && this.order.status !== 'cancelled';
  }

  getPaymentMethodName(method: string | undefined): string {
    if (!method) return 'Unknown';

    const methods: { [key: string]: string } = {
      credit_card: 'Credit Card',
      gcash: 'GCash',
      paymaya: 'PayMaya',
      bank_transfer: 'Bank Transfer',
      cash_on_delivery: 'Cash on Delivery',
    };
    return methods[method] || method;
  }

  formatCurrency(amount: number | undefined): string {
    if (!amount) return '₱0.00';
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  toTitleCase(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }
}
