import { Component, inject } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { DashboardStore } from '../dashboard/dashboard-store/dashboard-store';

@Component({
  selector: 'app-view',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app-view.html',
  styleUrl: './app-view.scss',
})
export class AppView {
  private dashboardStore = inject(DashboardStore);
  private authService = inject(AuthService);
  isUserAuthenticated = this.authService.isAuthenticated;

  constructor() {
    this.dashboardStore.loadDashboards();
  }
}
