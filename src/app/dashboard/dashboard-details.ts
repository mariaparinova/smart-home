import { Component, effect, inject, input } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { DashboardService } from './services/dashboard-service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
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
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);

  dashboardId = input.required<string>();
  dashboardResource = this.dashboardService.dashboardResource;

  constructor() {
    effect(() => {
      this.dashboardService.dashboardId.set(this.dashboardId());
    });

    effect(() => {
      if (!this.dashboardResource.hasValue()) {
        return;
      }

      const tabId = this.activatedRouter.firstChild?.snapshot.params['tabId'];

      if (tabId) {
        return;
      }

      const initTabId = this.dashboardResource.value().tabs[0]?.id;

      if (initTabId) {
        this.router.navigate([initTabId], { relativeTo: this.activatedRouter });
        return;
      }
    });
  }
}
