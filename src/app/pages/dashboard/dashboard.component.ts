import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { DashboardService, DashboardData } from '../../services/dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data?: DashboardData;
 @ViewChild('attCanvas') attCanvas!: ElementRef<HTMLCanvasElement>;
  // Chart.js config
  lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Attendance %',
      fill: true,
      tension: 0.4,
      borderWidth: 3
    }]
  };

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    interaction: { intersect: false, mode: 'index' },
    scales: {
      y: {
        min: 70, max: 100,
        ticks: { callback: (v:any) => v + '%' }
      }
    }
  };

  constructor(private api: DashboardService) {}

  ngOnInit(): void {
    this.api.getDashboard().subscribe(d => {
      this.data = d;
      this.lineChartData = {
        labels: d.attendance.labels,
        datasets: [{
          data: d.attendance.values,
          label: 'Attendance %',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        }]
      };
    });
  }
  

  ngAfterViewInit(): void {
    // Smooth Scrollbar (global from smooth-scrollbar.min.js)
    const win = window as any;
    const el = document.querySelector('#sidenav-scrollbar');
    const isWin = navigator.platform.indexOf('Win') > -1;
    if (isWin && el && win.Scrollbar?.init) {
      win.Scrollbar.init(el, { damping: 0.5 });
    }

    // Chart.js (global Chart from chartjs.min.js)
    const ctx = this.attCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 230, 0, 50);
    gradient.addColorStop(1, 'rgba(94,114,228,0.2)');
    gradient.addColorStop(0.2, 'rgba(94,114,228,0.0)');
    gradient.addColorStop(0, 'rgba(94,114,228,0)');
    new (window as any).Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],
        datasets: [{ label: 'Attendance %', data: [88,86,89,90,91,89,92,93,94], fill: true, tension: 0.4, borderColor: '#5e72e4', backgroundColor: gradient, borderWidth: 3 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  }
}