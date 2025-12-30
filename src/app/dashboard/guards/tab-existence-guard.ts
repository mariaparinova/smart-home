import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DashboardService } from '../services/dashboard-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Dashboard } from '../../shared/models/dashboard.models';

export const tabExistenceGuard: CanActivateFn = (route) => {
  const dashboardService = inject(DashboardService);
  const router = inject(Router);
  const dashboardId = route.paramMap.get('dashboardId');

  return toObservable(dashboardService.dashboardResource.value).pipe(
    filter((dashboard): dashboard is Dashboard => !!dashboard && dashboard.id === dashboardId),
    map((dashboard) => {
      const tabs = dashboard.tabs;

      if (tabs.length === 0) {
        return new RedirectCommand(router.createUrlTree(['/dashboard', dashboardId]), {
          replaceUrl: true,
        });
      }

      const tabId = route.paramMap.get('tabId');
      const doesTabExist = tabs.some((tab) => tab.id === tabId);

      if (!doesTabExist) {
        return new RedirectCommand(router.createUrlTree(['/dashboard', dashboardId, tabs[0].id]), {
          replaceUrl: true,
        });
      }

      return true;
    }),
  );
};
