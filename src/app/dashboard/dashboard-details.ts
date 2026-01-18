import { Component, effect, inject, input } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  readonly TabFormMode = TabFormMode;
  readonly Status = Status;
  readonly Direction = Direction;
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  dashboardStore = inject(DashboardStore);
  dashboardId = input.required<string>();

  constructor() {
    effect(() => {
      this.dashboardStore.updateActiveDashboardId(this.dashboardId());
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

    effect(() => {
      const isActiveDashboardLoadingError =
        this.dashboardStore.activeDashboardStatus() === Status.Error;

      const isDeletingDashboardError = this.dashboardStore.deleteDashboardStatus() === Status.Error;

      if (isActiveDashboardLoadingError) {
        this.showNotification('Error occurred. Dashboard was not loaded. Try again later');
      }

      if (isDeletingDashboardError) {
        this.showNotification('Error occurred. Dashboard was not deleted. Try again later');
      }
    });
  }

  openTabDialog(tabFormData: TabFormData) {
    this.dialog.open<TabForm, TabFormData>(TabForm, {
      data: tabFormData,
    });
  }

  openCreateCardDialog() {
    const tabId = this.dashboardStore.activeTabId();

    if (!tabId) {
      return;
    }

    this.dialog.open(CardLayoutPicker, {
      panelClass: 'large-dialog',
      data: { tabId },
    });
  }

  showNotification = (message: string) => {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  };

  deleteDashboard = () => {
    const userApprove = confirm(
      `Are you sure you want to delete the "${this.dashboardId()?.toUpperCase()}" dashboard?`,
    );

    if (!userApprove) {
      return;
    }

    this.dashboardStore.deleteDashboard(this.dashboardId());
  };

  deleteActiveTab = () => {
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
