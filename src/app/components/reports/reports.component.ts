import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  frequency: string;
  lastGenerated?: Date;
  status: 'active' | 'draft' | 'archived';
  size?: string;
  format: string[];
}

export interface ReportHistory {
  id: string;
  reportName: string;
  generatedDate: Date;
  generatedBy: string;
  format: string;
  size: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  // Report Templates
  reportTemplates: ReportTemplate[] = [
    {
      id: 'RPT001',
      name: 'Inventory Stock Report',
      description:
        'Comprehensive overview of current stock levels, low stock alerts, and inventory valuation',
      category: 'inventory',
      icon: 'inventory',
      frequency: 'Daily',
      lastGenerated: new Date('2024-09-24'),
      status: 'active',
      size: '2.3 MB',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 'RPT002',
      name: 'Sales Performance Report',
      description:
        'Monthly sales analysis with trends, top products, and revenue breakdown',
      category: 'sales',
      icon: 'trending_up',
      frequency: 'Monthly',
      lastGenerated: new Date('2024-09-20'),
      status: 'active',
      size: '1.8 MB',
      format: ['PDF', 'Excel'],
    },
    {
      id: 'RPT003',
      name: 'Customer Analysis Report',
      description:
        'Customer behavior analysis, purchase patterns, and loyalty metrics',
      category: 'customers',
      icon: 'people_alt',
      frequency: 'Weekly',
      lastGenerated: new Date('2024-09-22'),
      status: 'active',
      size: '3.1 MB',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 'RPT004',
      name: 'Order Fulfillment Report',
      description:
        'Order processing times, delivery performance, and fulfillment efficiency',
      category: 'orders',
      icon: 'local_shipping',
      frequency: 'Weekly',
      lastGenerated: new Date('2024-09-23'),
      status: 'active',
      size: '1.2 MB',
      format: ['PDF', 'Excel'],
    },
    {
      id: 'RPT005',
      name: 'Financial Summary Report',
      description:
        'Revenue, expenses, profit margins, and financial key performance indicators',
      category: 'financial',
      icon: 'account_balance',
      frequency: 'Monthly',
      lastGenerated: new Date('2024-09-15'),
      status: 'active',
      size: '950 KB',
      format: ['PDF', 'Excel'],
    },
    {
      id: 'RPT006',
      name: 'Product Performance Report',
      description:
        'Individual product sales, popularity rankings, and profitability analysis',
      category: 'products',
      icon: 'assessment',
      frequency: 'Monthly',
      status: 'draft',
      format: ['PDF', 'Excel', 'CSV'],
    },
  ];

  // Report History
  reportHistory: ReportHistory[] = [
    {
      id: 'HIST001',
      reportName: 'Inventory Stock Report',
      generatedDate: new Date('2024-09-24T10:30:00'),
      generatedBy: 'Admin User',
      format: 'PDF',
      size: '2.3 MB',
      status: 'completed',
      downloadUrl: '/reports/inventory-stock-2024-09-24.pdf',
    },
    {
      id: 'HIST002',
      reportName: 'Customer Analysis Report',
      generatedDate: new Date('2024-09-22T14:15:00'),
      generatedBy: 'Manager User',
      format: 'Excel',
      size: '3.1 MB',
      status: 'completed',
      downloadUrl: '/reports/customer-analysis-2024-09-22.xlsx',
    },
    {
      id: 'HIST003',
      reportName: 'Order Fulfillment Report',
      generatedDate: new Date('2024-09-23T16:45:00'),
      generatedBy: 'Admin User',
      format: 'PDF',
      size: '1.2 MB',
      status: 'completed',
      downloadUrl: '/reports/order-fulfillment-2024-09-23.pdf',
    },
    {
      id: 'HIST004',
      reportName: 'Sales Performance Report',
      generatedDate: new Date('2024-09-20T09:20:00'),
      generatedBy: 'Sales Manager',
      format: 'Excel',
      size: '1.8 MB',
      status: 'completed',
      downloadUrl: '/reports/sales-performance-2024-09-20.xlsx',
    },
    {
      id: 'HIST005',
      reportName: 'Financial Summary Report',
      generatedDate: new Date('2024-09-24T11:00:00'),
      generatedBy: 'Finance Team',
      format: 'PDF',
      size: '1.1 MB',
      status: 'processing',
    },
  ];

  // Display settings
  selectedCategory: string = 'all';
  selectedStatus: string = 'all';
  displayedHistoryColumns: string[] = [
    'reportName',
    'generatedDate',
    'generatedBy',
    'format',
    'size',
    'status',
    'actions',
  ];

  // Statistics
  totalReports = 0;
  activeReports = 0;
  reportsThisMonth = 0;
  totalDownloads = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateStatistics();
  }

  calculateStatistics(): void {
    this.totalReports = this.reportTemplates.length;
    this.activeReports = this.reportTemplates.filter(
      (r) => r.status === 'active'
    ).length;
    this.reportsThisMonth = this.reportHistory.filter((h) => {
      const thisMonth = new Date();
      thisMonth.setDate(1);
      return h.generatedDate >= thisMonth;
    }).length;
    this.totalDownloads = this.reportHistory.filter(
      (h) => h.status === 'completed'
    ).length;
  }

  // Filter methods
  filterByCategory(category: string): ReportTemplate[] {
    if (this.selectedCategory === 'all') {
      return this.reportTemplates;
    }
    return this.reportTemplates.filter(
      (report) => report.category === this.selectedCategory
    );
  }

  filterByStatus(status: string): ReportTemplate[] {
    if (this.selectedStatus === 'all') {
      return this.getFilteredReports();
    }
    return this.getFilteredReports().filter(
      (report) => report.status === this.selectedStatus
    );
  }

  getFilteredReports(): ReportTemplate[] {
    return this.filterByCategory(this.selectedCategory);
  }

  // Report actions
  generateReport(report: ReportTemplate): void {
    console.log('Generating report:', report.name);
    // TODO: Implement report generation
  }

  scheduleReport(report: ReportTemplate): void {
    console.log('Scheduling report:', report.name);
    // TODO: Implement report scheduling
  }

  editReport(report: ReportTemplate): void {
    console.log('Editing report template:', report.name);
    // TODO: Implement report template editing
  }

  deleteReport(report: ReportTemplate): void {
    console.log('Deleting report template:', report.name);
    // TODO: Implement report deletion with confirmation
  }

  duplicateReport(report: ReportTemplate): void {
    console.log('Duplicating report template:', report.name);
    // TODO: Implement report duplication
  }

  // History actions
  downloadReport(historyItem: ReportHistory): void {
    console.log('Downloading report:', historyItem.reportName);
    // TODO: Implement report download
  }

  viewReport(historyItem: ReportHistory): void {
    console.log('Viewing report:', historyItem.reportName);
    // TODO: Implement report preview
  }

  deleteHistoryItem(historyItem: ReportHistory): void {
    console.log('Deleting history item:', historyItem.reportName);
    // TODO: Implement history item deletion
  }

  // Toolbar actions
  createNewReport(): void {
    console.log('Creating new report template');
    // TODO: Implement new report template creation
  }

  exportReportList(): void {
    console.log('Exporting report list');
    // TODO: Implement report list export
  }

  importReportTemplates(): void {
    console.log('Importing report templates');
    // TODO: Implement report template import
  }

  openReportSettings(): void {
    console.log('Opening report settings');
    // TODO: Implement report settings dialog
  }

  // Utility methods
  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'primary';
      case 'draft':
        return 'accent';
      case 'archived':
        return 'warn';
      case 'completed':
        return 'primary';
      case 'processing':
        return 'accent';
      case 'failed':
        return 'warn';
      default:
        return '';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatFileSize(size: string): string {
    return size;
  }
}
