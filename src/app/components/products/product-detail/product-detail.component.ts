import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ProductLabelComponent } from '../product-label/product-label.component';

// Product interface (matching the one from products component)
export interface Product {
  code: string;
  name: string;
  category: string;
  stock: number;
  reorder: number;
  price: number;
  supplier: string;
  description?: string;
  specifications?: { [key: string]: string };
  images?: string[];
  lastUpdated?: Date;
  location?: string;
}

// Transaction history interface
export interface Transaction {
  id: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  date: Date;
  reference: string;
  notes?: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  @Input() productCode?: string;

  // Sample product data
  product: Product = {
    code: 'LAP001',
    name: 'Dell Latitude 5520',
    category: 'Laptops',
    stock: 25,
    reorder: 5,
    price: 899.99,
    supplier: 'Dell Technologies',
    description:
      'Professional business laptop with Intel Core i5 processor, 16GB RAM, and 512GB SSD. Perfect for business professionals requiring reliable performance and security features.',
    specifications: {
      Processor: 'Intel Core i5-1135G7',
      Memory: '16GB DDR4 RAM',
      Storage: '512GB NVMe SSD',
      Display: '15.6" Full HD (1920x1080)',
      Graphics: 'Intel Iris Xe Graphics',
      'Operating System': 'Windows 11 Pro',
      Weight: '3.99 lbs',
      'Battery Life': 'Up to 8 hours',
      Warranty: '3 years Dell ProSupport',
    },
    images: [
      'assets/images/dell-latitude-front.jpg',
      'assets/images/dell-latitude-side.jpg',
      'assets/images/dell-latitude-ports.jpg',
    ],
    lastUpdated: new Date('2024-09-20'),
    location: 'Warehouse A-15',
  };

  // Sample transaction history
  transactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'IN',
      quantity: 10,
      date: new Date('2024-09-20'),
      reference: 'PO-2024-0892',
      notes: 'Initial stock delivery from Dell',
    },
    {
      id: 'TXN002',
      type: 'OUT',
      quantity: 3,
      date: new Date('2024-09-18'),
      reference: 'SO-2024-1234',
      notes: 'Sold to Corporate Client ABC',
    },
    {
      id: 'TXN003',
      type: 'IN',
      quantity: 15,
      date: new Date('2024-09-15'),
      reference: 'PO-2024-0845',
      notes: 'Bulk order for Q3 inventory',
    },
    {
      id: 'TXN004',
      type: 'OUT',
      quantity: 2,
      date: new Date('2024-09-10'),
      reference: 'SO-2024-1189',
      notes: 'Employee laptop replacement',
    },
    {
      id: 'TXN005',
      type: 'ADJUSTMENT',
      quantity: -1,
      date: new Date('2024-09-08'),
      reference: 'ADJ-2024-003',
      notes: 'Damaged unit - warranty replacement',
    },
  ];

  // Display columns for transaction history
  transactionColumns: string[] = [
    'date',
    'type',
    'quantity',
    'reference',
    'notes',
  ];

  // Current selected image index
  selectedImageIndex = 0;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // In a real app, you would fetch product data based on productCode
    if (this.productCode) {
      this.loadProduct(this.productCode);
    }
  }

  // Method to load product data (placeholder)
  private loadProduct(code: string): void {
    // This would typically make an HTTP call to get product details
    console.log('Loading product with code:', code);
  }

  // Get stock level percentage for progress bar
  getStockPercentage(): number {
    const maxStock = Math.max(this.product.stock, this.product.reorder * 3);
    return (this.product.stock / maxStock) * 100;
  }

  // Check if stock is low
  isLowStock(): boolean {
    return this.product.stock <= this.product.reorder;
  }

  // Get stock status
  getStockStatus(): string {
    if (this.product.stock === 0) return 'Out of Stock';
    if (this.isLowStock()) return 'Low Stock';
    return 'In Stock';
  }

  // Get stock status color
  getStockStatusColor(): string {
    if (this.product.stock === 0) return 'warn';
    if (this.isLowStock()) return 'accent';
    return 'primary';
  }

  // Format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  // Format date
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  // Action methods
  editProduct(): void {
    console.log('Edit product:', this.product.code);
    // Navigate to edit form or open dialog
  }

  deleteProduct(): void {
    console.log('Delete product:', this.product.code);
    // Show confirmation dialog and delete
  }

  adjustStock(): void {
    console.log('Adjust stock for:', this.product.code);
    // Open stock adjustment dialog
  }

  reorderProduct(): void {
    console.log('Reorder product:', this.product.code);
    // Create purchase order or reorder request
  }

  viewSupplier(): void {
    console.log('View supplier:', this.product.supplier);
    // Navigate to supplier details
  }

  printLabel(): void {
    const dialogRef = this.dialog.open(ProductLabelComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: this.product,
      disableClose: false,
      panelClass: 'product-label-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Label dialog was closed');
    });
  }

  // Image navigation
  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  previousImage(): void {
    if (this.product.images && this.product.images.length > 0) {
      this.selectedImageIndex =
        (this.selectedImageIndex - 1 + this.product.images.length) %
        this.product.images.length;
    }
  }

  nextImage(): void {
    if (this.product.images && this.product.images.length > 0) {
      this.selectedImageIndex =
        (this.selectedImageIndex + 1) % this.product.images.length;
    }
  }

  // Utility methods for template
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/no-image-placeholder.png';
    }
  }

  calculateTurnoverRate(): number {
    return (
      Math.round((this.product.stock / (this.product.reorder || 1)) * 10) / 10
    );
  }
}
