import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardStore } from './dashboard-store/dashboard-store';

@Component({
  selector: 'app-dashboard-placeholder',
  template:
    '<div class="empty-dashboard">You don’t have any dashboards yet. They’ll appear here as soon as you create them.</div>',
})
export class DashboardPlaceholder {
  private dashboardStore = inject(DashboardStore);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const dashboards = this.dashboardStore.dashboards();

      if (dashboards?.length) {
        this.router.navigate([dashboards[0].id], {
          replaceUrl: true,
          relativeTo: this.activatedRouter,
        });
      }
    });
  }
}
