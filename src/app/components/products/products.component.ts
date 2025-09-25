import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'category', 'stock', 'actions'];
  products = new MatTableDataSource<Product>([]);

  // Sample products data
  private productsData: Product[] = [
    {
      code: 'LAP001',
      name: 'Dell Latitude 5520',
      category: 'Laptops',
      stock: 25,
      reorder: 5,
      price: 899.99,
      supplier: 'Dell Technologies',
    },
    {
      code: 'LAP002',
      name: 'MacBook Pro 16"',
      category: 'Laptops',
      stock: 12,
      reorder: 3,
      price: 2399.99,
      supplier: 'Apple Inc.',
    },
    {
      code: 'LAP003',
      name: 'HP EliteBook 840',
      category: 'Laptops',
      stock: 8,
      reorder: 5,
      price: 1299.99,
      supplier: 'HP Inc.',
    },
    {
      code: 'KEY001',
      name: 'Logitech MX Keys',
      category: 'Keyboards',
      stock: 45,
      reorder: 10,
      price: 99.99,
      supplier: 'Logitech',
    },
    {
      code: 'KEY002',
      name: 'Corsair K95 RGB',
      category: 'Keyboards',
      stock: 3,
      reorder: 5,
      price: 199.99,
      supplier: 'Corsair',
    },
    {
      code: 'MOU001',
      name: 'Logitech MX Master 3',
      category: 'Mice',
      stock: 32,
      reorder: 8,
      price: 79.99,
      supplier: 'Logitech',
    },
    {
      code: 'MOU002',
      name: 'Razer DeathAdder V3',
      category: 'Mice',
      stock: 18,
      reorder: 6,
      price: 69.99,
      supplier: 'Razer',
    },
    {
      code: 'MON001',
      name: 'Dell UltraSharp 27"',
      category: 'Monitors',
      stock: 15,
      reorder: 4,
      price: 349.99,
      supplier: 'Dell Technologies',
    },
    {
      code: 'MON002',
      name: 'LG 4K UltraWide 34"',
      category: 'Monitors',
      stock: 7,
      reorder: 3,
      price: 599.99,
      supplier: 'LG Electronics',
    },
    {
      code: 'PRI001',
      name: 'Canon PIXMA TR8620',
      category: 'Printers',
      stock: 2,
      reorder: 3,
      price: 179.99,
      supplier: 'Canon',
    },
    {
      code: 'PRI002',
      name: 'HP LaserJet Pro M404n',
      category: 'Printers',
      stock: 6,
      reorder: 2,
      price: 229.99,
      supplier: 'HP Inc.',
    },
    {
      code: 'CAB001',
      name: 'Ethernet Cable Cat6 25ft',
      category: 'Cables',
      stock: 5,
      reorder: 10,
      price: 12.99,
      supplier: 'AmazonBasics',
    },
    {
      code: 'HUB001',
      name: 'Anker 7-Port USB Hub',
      category: 'USB Hubs',
      stock: 2,
      reorder: 5,
      price: 35.99,
      supplier: 'Anker',
    },
    {
      code: 'ADP001',
      name: 'HDMI to USB-C Adapter',
      category: 'Adapters',
      stock: 1,
      reorder: 8,
      price: 24.99,
      supplier: 'Belkin',
    },
    {
      code: 'INK001',
      name: 'Canon Printer Ink Set',
      category: 'Printer Supplies',
      stock: 3,
      reorder: 6,
      price: 45.99,
      supplier: 'Canon',
    },
  ];

  ngOnInit(): void {
    // Initialize the data source with sample data
    this.products.data = this.productsData;
  }

  // Filter method for search functionality
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  // Method to add new product (placeholder)
  addProduct(): void {
    console.log('Add product functionality - to be implemented');
    // This would typically open a dialog or navigate to an add product page
  }

  // Method to edit product (placeholder)
  editProduct(product: Product): void {
    console.log('Edit product:', product);
    // This would typically open a dialog or navigate to an edit product page
  }

  // Method to delete product (placeholder)
  deleteProduct(product: Product): void {
    console.log('Delete product:', product);
    // This would typically show a confirmation dialog and then delete the product
    const index = this.products.data.indexOf(product);
    if (index > -1) {
      const updatedData = [...this.products.data];
      updatedData.splice(index, 1);
      this.products.data = updatedData;
    }
  }

  // Helper method to check if stock is low
  isLowStock(product: Product): boolean {
    return product.stock <= product.reorder;
  }

  exportProducts(): void {
    console.log('Export products data');
    // TODO: Implement export functionality
  }

  importProducts(): void {
    console.log('Import products data');
    // TODO: Implement import functionality
  }
}
