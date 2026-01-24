import { Component, effect, inject, input } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DashboardStore, Status } from './dashboard-store/dashboard-store';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Direction } from '../shared/models/dashboard.models';
import { TabForm, TabFormData, TabFormMode } from './components/tab-form/tab-form';
import { MatDialog } from '@angular/material/dialog';
import { CardLayoutPicker } from './components/card-layout-picker/card-layout-picker';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../auth/services/auth.service';

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
    MatIcon,
    MatIconButton,
    MatButton,
    MatMenuTrigger,
    MatMenuItem,
    MatMenu,
  ],
  templateUrl: './dashboard-details.html',
  styleUrl: './dashboard-details.scss',
})
export class DashboardDetails {
  protected TabFormMode = TabFormMode;
  protected Status = Status;
  protected Direction = Direction;
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  protected dashboardStore = inject(DashboardStore);
  dashboardId = input.required<string>();

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.dashboardStore.updateActiveDashboardId(this.dashboardId());
      }
    });

    effect(() => {
      const activeDashboard = this.dashboardStore.activeDashboard();

      if (!activeDashboard) {
        return;
      }

      const tabId = this.activatedRouter.firstChild?.snapshot.params['tabId'];

      if (tabId) {
        return;
      }

      const initTabId = activeDashboard.tabs[0]?.id;

      if (initTabId) {
        this.router.navigate([initTabId], { relativeTo: this.activatedRouter });
      }
    });
  }

  protected openTabDialog(tabFormData: TabFormData) {
    this.dialog.open<TabForm, TabFormData>(TabForm, {
      data: tabFormData,
    });
  }

  protected openCreateCardDialog() {
    const tabId = this.dashboardStore.activeTabId();

    if (!tabId) {
      return;
    }

    this.dialog.open(CardLayoutPicker, {
      panelClass: 'large-dialog',
      data: { tabId },
    });
  }

  protected deleteDashboard = () => {
    const userApprove = confirm(
      `Are you sure you want to delete the "${this.dashboardId()?.toUpperCase()}" dashboard?`,
    );

    if (!userApprove) {
      return;
    }

    this.dashboardStore.deleteDashboard(this.dashboardId());
  };

  protected deleteActiveTab = () => {
    this.dashboardStore.deleteActiveTab();

    const targetId = this.dashboardStore.activeDashboard()?.tabs?.[0]?.id;
    const dashboardId = this.dashboardId();

    if (targetId) {
      this.router.navigate(['/dashboard', dashboardId, targetId], {
        replaceUrl: true,
      });
    } else {
      this.router.navigate(['/dashboard', dashboardId], { replaceUrl: true });
    }
  };
}
