import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

export interface Product {
  code: string;
  name: string;
  category: string;
  price: number;
  supplier: string;
  location?: string;
  description?: string;
}

@Component({
  selector: 'app-product-label',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './product-label.component.html',
  styleUrl: './product-label.component.scss',
})
export class ProductLabelComponent implements OnInit, AfterViewInit {
  @ViewChild('qrCanvas', { static: false })
  qrCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    public dialogRef: MatDialogRef<ProductLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.generateQRCode();
  }

  private async generateQRCode(): Promise<void> {
    try {
      const qrData = JSON.stringify({
        code: this.product.code,
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
      });

      await QRCode.toCanvas(this.qrCanvas.nativeElement, qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onPrint(): void {
    window.print();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
