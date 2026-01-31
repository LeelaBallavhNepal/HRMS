import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DashboardData {
  totalEmployees: number;
  presentToday: number;
  pendingLeaves: number;
  openPositions: number;
  payrollProgress: number;
  attendance: { labels: string[]; values: number[] };
  hires: Array<{ name: string; role: string; dept: string; doj: string; status: 'Active'|'Probation'|'Onboarding'; avatar?: string }>; 
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getDashboard(): Observable<DashboardData> {
    return of({
      totalEmployees: 328,
      presentToday: 302,
      pendingLeaves: 12,
      openPositions: 7,
      payrollProgress: 68,
      attendance: {
        labels: ['Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],
        values: [88,86,89,90,91,89,92,93,94]
      },
      hires: [
        { name: 'Ananya Sharma', role: 'UI/UX Designer', dept: 'Design', doj: '01 Aug 2025', status: 'Active', avatar: 'assets/img/team-2.jpg' },
        { name: 'Rohit Verma', role: 'Backend Engineer', dept: 'Engineering', doj: '25 Jul 2025', status: 'Probation', avatar: 'assets/img/team-3.jpg' },
        { name: 'Priya Das', role: 'HR Executive', dept: 'Human Resources', doj: '18 Jul 2025', status: 'Onboarding', avatar: 'assets/img/team-4.jpg' }
      ]
    });
  }
}