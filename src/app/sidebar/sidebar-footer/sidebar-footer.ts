import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DashboardForm } from '../../dashboard/components/dashboard-form/dashboard-form';
import { DashboardStore } from '../../dashboard/dashboard-store/dashboard-store';

@Component({
  selector: 'app-sidebar-footer',
  imports: [NgOptimizedImage, MatIcon, MatIconButton],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  dashboardStore = inject(DashboardStore);
  user = this.authService.user;

  openCreateDashboardDialog() {
    this.dialog.open(DashboardForm);
  }

  logout() {
    this.authService.logout();
  }
}
