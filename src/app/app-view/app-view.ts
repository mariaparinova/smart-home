import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { DashboardStore } from '../dashboard/dashboard-store/dashboard-store';
import { ApiUrlService } from '../shared/services/api-url.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view',
  imports: [Sidebar, RouterOutlet, MatProgressSpinner],
  templateUrl: './app-view.html',
  styleUrl: './app-view.scss',
})
export class AppView implements OnInit {
  private dashboardStore = inject(DashboardStore);
  protected authService = inject(AuthService);
  protected apiUrlService = inject(ApiUrlService);

  ngOnInit(): void {
    this.dashboardStore.loadDashboards();
  }
}
