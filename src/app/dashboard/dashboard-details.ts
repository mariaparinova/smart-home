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
import { DashboardStore } from './dashboard-store/dashboard-store';

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
  private dashboardStore = inject(DashboardStore);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);

  dashboardId = input.required<string>();
  activeDashboard = this.dashboardStore.activeDashboard;

  constructor() {
    effect(() => {
      this.dashboardStore.updateActiveDashboardId(this.dashboardId());
    });

    effect(() => {
      const activeDashboardValue = this.activeDashboard().value();

      if (!activeDashboardValue) {
        return;
      }

      const tabId = this.activatedRouter.firstChild?.snapshot.params['tabId'];

      if (tabId) {
        return;
      }

      const initTabId = activeDashboardValue.tabs[0]?.id;

      if (initTabId) {
        this.router.navigate([initTabId], { relativeTo: this.activatedRouter });
        return;
      }
    });
  }
}
