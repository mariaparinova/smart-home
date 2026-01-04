import { inject, Injectable, signal } from '@angular/core';
import { SmartHomeApiService } from '../../shared/services/smart-home-api.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private smartHomeApiService = inject(SmartHomeApiService);
  dashboards = toSignal(this.smartHomeApiService.getDashboards());
  dashboardId = signal<string | undefined>(undefined);

  readonly dashboardResource = rxResource({
    params: () => {
      const dashboardId = this.dashboardId();

      if (!dashboardId) {
        return;
      }

      return { dashboardId };
    },
    stream: ({ params }) => this.smartHomeApiService.getDashboard(params.dashboardId),
  });
}
