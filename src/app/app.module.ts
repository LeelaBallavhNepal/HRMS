import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { provideRouter, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { routes } from './app.routes';
import { ProfileComponent } from './pages/profile/profile.component';
import { TabsNavComponent } from './tabs-nav/tabs-nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    DashboardComponent,
    EmployeesComponent,
    AttendanceComponent,
    ProfileComponent,
    TabsNavComponent,
    
  ],
  imports: [
    BrowserModule, RouterModule,RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
