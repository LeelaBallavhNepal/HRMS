import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AttendanceComponent } from './pages/attendance/attendance.component'; 
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent, title: 'HRMS • Dashboard' },
      { path: 'employees', component: EmployeesComponent, title: 'HRMS • Employees' },
      { path: 'attendance', component: AttendanceComponent, title: 'HRMS • Attendance' },
    //   { path: 'leaves', component: LeavesComponent, title: 'HRMS • Leaves' },
    //   { path: 'payroll', component: PayrollComponent, title: 'HRMS • Payroll' },
    //   { path: 'recruitment', component: RecruitmentComponent, title: 'HRMS • Recruitment' },
      { path: 'profile', component: ProfileComponent, title: 'HRMS • Profile' }
    ]
  },
  //{ path: 'sign-in', component: SigninComponent, title: 'HRMS • Sign In' },
  { path: '**', redirectTo: 'dashboard' }
];