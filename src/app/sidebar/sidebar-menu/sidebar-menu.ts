import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardStore } from '../../dashboard/dashboard-store/dashboard-store';

@Component({
  selector: 'app-sidebar-menu',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  protected dashboardStore = inject(DashboardStore);
}
