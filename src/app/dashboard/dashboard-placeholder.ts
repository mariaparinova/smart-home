import { Component, effect, inject } from '@angular/core';
import { DashboardService } from './services/dashboard-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-placeholder',
  template:
    '<div class="empty-dashboard">You don’t have any dashboards yet. They’ll appear here as soon as you create them.</div>',
})
export class DashboardPlaceholder {
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const dashboards = this.dashboardService.dashboards();

      if (dashboards?.length) {
        this.router.navigate([dashboards[0].id], {
          replaceUrl: true,
          relativeTo: this.activatedRouter,
        });
      }
    });
  }
}
