import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartOptions,
  ChartType,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarController,
  LineController,
} from 'chart.js';

// Register Chart.js components globally
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarController,
  LineController
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BaseChartDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Chart.js components are already registered globally above
    console.log('Dashboard component initialized');
  }
  // 📊 Bar Chart - Stock Levels
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  } as any;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels: string[] = [
    'Laptops',
    'Keyboards',
    'Mice',
    'Monitors',
    'Printers',
  ];
  public barChartData: any[] = [
    {
      data: [120, 45, 85, 60, 20],
      label: 'Stock Levels',
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ];

  // 📈 Line Chart - Sales vs Purchases
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  public lineChartData: any[] = [
    {
      data: [200, 250, 300, 280, 350, 400],
      label: 'Sales',
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
    },
    {
      data: [150, 180, 220, 200, 260, 300],
      label: 'Purchases',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: false,
    },
  ];

  // 🔔 Low Stock Table
  lowStockItems = [
    { name: 'Printer Ink', stock: 3 },
    { name: 'Ethernet Cable', stock: 5 },
    { name: 'USB Hubs', stock: 2 },
    { name: 'HDMI Adapters', stock: 1 },
  ];

  refreshData(): void {
    console.log('Refreshing dashboard data');
    // TODO: Implement refresh functionality
  }

  exportReport(): void {
    console.log('Exporting dashboard report');
    // TODO: Implement export functionality
  }

  viewSettings(): void {
    console.log('Opening dashboard settings');
    // TODO: Implement settings view
  }
}
