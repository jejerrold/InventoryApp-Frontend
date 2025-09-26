import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  totalAmount: number;
}

interface TaggedBarcode {
  code: string;
  timestamp: Date;
  scanType: 'manual' | 'camera';
  notes?: string;
}

@Component({
  selector: 'app-order-tag-references',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-tag-references.component.html',
  styleUrl: './order-tag-references.component.scss',
})
export class OrderTagReferencesComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('barcodeInput') barcodeInput!: ElementRef<HTMLInputElement>;

  // Order selection
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrder: Order | null = null;
  orderSearchTerm = '';

  // Barcode management
  currentBarcode = '';
  taggedBarcodes: TaggedBarcode[] = [];
  editingBarcode: TaggedBarcode | null = null;
  editingIndex = -1;

  // Scanner
  isScanning = false;
  stream: MediaStream | null = null;

  // UI state
  showOrderSelection = false;

  // Add subscription tracking
  private queryParamsSubscription?: Subscription;

  route = inject(ActivatedRoute);
  document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID);
  router = inject(Router);

  ngOnInit() {
    this.loadOrders();
    this.setupQueryParamsSubscription();
    this.debugRouteInfo();
  }

  ngOnDestroy() {
    this.stopScanning();
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  private debugRouteInfo() {
    console.log('=== ROUTE DEBUG INFO ===');
    console.log('Route snapshot params:', this.route.snapshot.params);
    console.log('Route snapshot queryParams:', this.route.snapshot.queryParams);
    console.log('Route snapshot url:', this.route.snapshot.url);
    console.log('Route snapshot fragment:', this.route.snapshot.fragment);

    // Check current URL directly
    if (isPlatformBrowser(this.platformId)) {
      console.log('Current URL:', this.document.defaultView?.location?.href);
      console.log(
        'Search params:',
        this.document.defaultView?.location?.search
      );

      // Parse URL manually as fallback
      const urlParams = new URLSearchParams(
        this.document.defaultView?.location?.search
      );
      console.log('Manual URL parsing:');
      console.log('orderId from URL:', urlParams.get('orderId'));
      console.log('orderNumber from URL:', urlParams.get('orderNumber'));
    }
    console.log('========================');
  }

  private setupQueryParamsSubscription() {
    console.log('Setting up query params subscription...');

    // Try multiple approaches

    // Approach 1: Observable subscription

    this.queryParamsSubscription = this.route.params.subscribe((params) => {
      console.log('Observable params received:', params);
      this.handleQueryParams(params);
    });

    // Approach 2: Snapshot fallback
    setTimeout(() => {
      console.log('Checking snapshot params after timeout...');
      const snapshotParams = this.route.snapshot.queryParams;
      console.log('Snapshot params:', snapshotParams);

      if (Object.keys(snapshotParams).length > 0) {
        this.handleQueryParams(snapshotParams);
      }
    }, 100);

    // Approach 3: Manual URL parsing fallback
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.parseUrlManually();
      }, 200);
    }
  }

  private handleQueryParams(params: any) {
    const orderId = params['orderId'];
    const orderNumber = params['orderNumber'];

    console.log('Handling query params:', { orderId, orderNumber, params });

    if (orderId || orderNumber) {
      this.waitForOrdersAndPreSelect(orderId, orderNumber);
    } else {
      console.log('No orderId or orderNumber found in params');
    }
  }

  private parseUrlManually() {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const currentUrl = this.document.defaultView?.location?.href;
      if (currentUrl) {
        const url = new URL(currentUrl);
        const orderId = url.searchParams.get('orderId');
        const orderNumber = url.searchParams.get('orderNumber');

        console.log('Manual URL parsing results:', { orderId, orderNumber });

        if (orderId || orderNumber) {
          console.log('Found params via manual parsing, using them...');
          this.waitForOrdersAndPreSelect(
            orderId || undefined,
            orderNumber || undefined
          );
        }
      }
    } catch (error) {
      console.error('Error parsing URL manually:', error);
    }
  }

  private waitForOrdersAndPreSelect(orderId?: string, orderNumber?: string) {
    const checkAndSelect = () => {
      if (this.orders.length > 0) {
        console.log('Orders loaded, attempting to pre-select');
        this.preSelectOrder(orderId, orderNumber);
      } else {
        console.log('Orders not loaded yet, retrying...');
        setTimeout(checkAndSelect, 100);
      }
    };

    checkAndSelect();
  }

  loadOrders() {
    console.log('Loading orders...');
    // Mock orders data - replace with actual service call
    this.orders = [
      {
        id: 'ORD-001',
        orderNumber: 'ORD-2024-001',
        customerName: 'Maria Santos',
        status: 'processing',
        totalAmount: 15750.0,
      },
      {
        id: 'ORD-002',
        orderNumber: 'ORD-2024-002',
        customerName: 'Juan dela Cruz',
        status: 'confirmed',
        totalAmount: 8950.0,
      },
      {
        id: 'ORD-003',
        orderNumber: 'ORD-2024-003',
        customerName: 'Ana Reyes',
        status: 'shipped',
        totalAmount: 25300.0,
      },
    ];
    this.filteredOrders = [...this.orders];
    console.log('Orders loaded:', this.orders.length);
  }

  preSelectOrder(orderId?: string, orderNumber?: string) {
    console.log('PreSelectOrder called:', {
      orderId,
      orderNumber,
      ordersCount: this.orders.length,
    });

    if (this.orders.length === 0) {
      console.log('No orders available for selection');
      return;
    }

    let targetOrder: Order | undefined;

    if (orderId) {
      targetOrder = this.orders.find((order) => order.id === orderId);
      console.log('Search by orderId result:', targetOrder);
    } else if (orderNumber) {
      targetOrder = this.orders.find(
        (order) => order.orderNumber === orderNumber
      );
      console.log('Search by orderNumber result:', targetOrder);
    }

    if (targetOrder) {
      console.log('Target order found, selecting:', targetOrder);
      this.selectOrder(targetOrder);
      // Scroll to barcode input section
      setTimeout(() => {
        this.scrollToBarcodeInput();
      }, 500);
    } else {
      console.log('No matching order found for:', { orderId, orderNumber });
    }
  }

  searchOrders() {
    const term = this.orderSearchTerm.toLowerCase();
    this.filteredOrders = this.orders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term)
    );
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.loadExistingBarcodes(order.id);

    // Update filtered orders to show the selected order at the top
    this.filteredOrders = this.filteredOrders.filter((o) => o.id !== order.id);
    this.filteredOrders.unshift(order);
  }

  loadExistingBarcodes(orderId: string) {
    // Load existing barcodes for the selected order
    // Mock data - replace with actual service call
    this.taggedBarcodes = [];
  }

  addBarcode() {
    if (!this.currentBarcode.trim()) return;

    const barcode: TaggedBarcode = {
      code: this.currentBarcode.trim(),
      timestamp: new Date(),
      scanType: 'manual',
    };

    // Check for duplicates
    const exists = this.taggedBarcodes.some((b) => b.code === barcode.code);
    if (exists) {
      alert('This barcode has already been added to this order.');
      return;
    }

    this.taggedBarcodes.push(barcode);
    this.currentBarcode = '';
    this.focusBarcodeInput();
  }

  removeBarcode(index: number) {
    if (confirm('Are you sure you want to remove this barcode?')) {
      this.taggedBarcodes.splice(index, 1);
    }
  }

  editBarcode(index: number) {
    this.editingBarcode = { ...this.taggedBarcodes[index] };
    this.editingIndex = index;
  }

  saveEditedBarcode() {
    if (this.editingBarcode && this.editingIndex >= 0) {
      this.taggedBarcodes[this.editingIndex] = { ...this.editingBarcode };
      this.closeEditModal();
    }
  }

  closeEditModal() {
    this.editingBarcode = null;
    this.editingIndex = -1;
  }

  async startScanning() {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Camera scanning not available in server-side rendering');
      return;
    }

    try {
      if (navigator && navigator.mediaDevices) {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
          this.isScanning = true;

          // Start barcode detection (simplified - use a proper barcode library)
          this.detectBarcode();
        }
      } else {
        throw new Error('MediaDevices not supported');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }

  stopScanning() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.isScanning = false;
  }

  detectBarcode() {
    // Simplified barcode detection - replace with proper library like ZXing
    // This is just a placeholder for demonstration
    setTimeout(() => {
      if (this.isScanning) {
        // Simulate barcode detection
        this.detectBarcode();
      }
    }, 100);
  }

  clearInput() {
    this.currentBarcode = '';
    this.focusBarcodeInput();
  }

  clearAllBarcodes() {
    if (
      confirm(
        'Are you sure you want to clear all barcodes? This action cannot be undone.'
      )
    ) {
      this.taggedBarcodes = [];
    }
  }

  saveBarcodes() {
    if (!this.selectedOrder || this.taggedBarcodes.length === 0) return;

    const saveData = {
      orderId: this.selectedOrder.id,
      barcodes: this.taggedBarcodes,
    };

    console.log('Saving barcodes:', saveData);
    // TODO: Call backend service to save barcodes

    alert(
      `Successfully saved ${this.taggedBarcodes.length} barcodes to order ${this.selectedOrder.orderNumber}`
    );
  }

  exportBarcodes() {
    if (this.taggedBarcodes.length === 0 || !isPlatformBrowser(this.platformId))
      return;

    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });

    if (this.document.defaultView) {
      const url = this.document.defaultView.URL.createObjectURL(blob);

      const link = this.document.createElement('a');
      link.href = url;
      link.download = `barcodes_${this.selectedOrder?.orderNumber}_${
        new Date().toISOString().split('T')[0]
      }.csv`;
      this.document.body.appendChild(link);
      link.click();
      this.document.body.removeChild(link);

      this.document.defaultView.URL.revokeObjectURL(url);
    }
  }

  generateCSV(): string {
    const headers = ['Barcode', 'Timestamp', 'Scan Type', 'Notes'];
    const rows = this.taggedBarcodes.map((barcode) => [
      barcode.code,
      barcode.timestamp.toISOString(),
      barcode.scanType,
      barcode.notes || '',
    ]);

    return [headers, ...rows]
      .map((row) => row.map((field) => `"${field}"`).join(','))
      .join('\n');
  }

  previewReport() {
    // Generate and display a preview report
    console.log('Preview report for barcodes:', this.taggedBarcodes);
    // TODO: Implement report preview
  }

  goBack() {
    this.router.navigate(['/orders']);
  }

  toggleOrderSelection() {
    this.showOrderSelection = !this.showOrderSelection;
  }

  clearSelection() {
    this.selectedOrder = null;
    this.taggedBarcodes = [];
    this.showOrderSelection = true;

    // Remove query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true,
    });
  }

  // Statistics methods
  getScannedCount(): number {
    return this.taggedBarcodes.filter((b) => b.scanType === 'camera').length;
  }

  getManualCount(): number {
    return this.taggedBarcodes.filter((b) => b.scanType === 'manual').length;
  }

  getDuplicateCount(): number {
    const codes = this.taggedBarcodes.map((b) => b.code);
    const uniqueCodes = new Set(codes);
    return codes.length - uniqueCodes.size;
  }

  // Utility methods
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  private focusBarcodeInput() {
    setTimeout(() => {
      if (this.barcodeInput) {
        this.barcodeInput.nativeElement.focus();
      }
    }, 100);
  }

  private scrollToBarcodeInput() {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.document.querySelector('.barcode-input-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Focus on barcode input
      setTimeout(() => {
        if (this.barcodeInput) {
          this.barcodeInput.nativeElement.focus();
        }
      }, 300);
    }
  }
}
