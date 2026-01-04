import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardService } from '../../dashboard/services/dashboard-service';

@Component({
  selector: 'app-sidebar-menu',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  private dashboardService = inject(DashboardService);
  dashboards = this.dashboardService.dashboards;
}
