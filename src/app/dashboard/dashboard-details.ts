import { Component, inject, input } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { DashboardService } from './services/dashboard-service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-details',
  imports: [
    RouterOutlet,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterLinkActive,
    MatProgressSpinner,
  ],
  templateUrl: './dashboard-details.html',
  styleUrl: './dashboard-details.scss',
})
export class DashboardDetails {
  private dashboardService = inject(DashboardService);
  dashboardId = input.required<string>();
  dashboardResource = this.dashboardService.dashboardResource;
}
