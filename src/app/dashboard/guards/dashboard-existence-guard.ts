import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, of, switchMap } from 'rxjs';
import { Dashboard } from '../../shared/models/dashboard.models';

export const dashboardExistenceGuard: CanActivateFn = (route) => {
  const dashboardService = inject(DashboardService);
  const router = inject(Router);
  const dashboard$ = toObservable(dashboardService.dashboardResource.value);

  return toObservable(dashboardService.dashboards).pipe(
    filter((dashboards) => !!dashboards),
    switchMap((dashboards) => {
      if (dashboards.length === 0) {
        return of(
          new RedirectCommand(router.createUrlTree(['/dashboard']), {
            replaceUrl: true,
          }),
        );
      }

      const dashboardId = route.paramMap.get('dashboardId');
      const doesDashboardExist = dashboards.some((dashboard) => dashboard.id === dashboardId);

      if (!doesDashboardExist) {
        return of(
          new RedirectCommand(router.createUrlTree(['/dashboard', dashboards[0].id]), {
            replaceUrl: true,
          }),
        );
      }

      dashboardService.dashboardId.set(dashboardId!);

      const isTabIdSpecified = !!route.firstChild;
      if (isTabIdSpecified) {
        return of(true);
      }

      return dashboard$.pipe(
        filter((dashboard): dashboard is Dashboard => !!dashboard && dashboard.id === dashboardId),
        map((dashboard) => {
          const tabs = dashboard.tabs;

          if (tabs.length > 0) {
            return new RedirectCommand(
              router.createUrlTree(['/dashboard', dashboardId, tabs[0].id]),
              {
                replaceUrl: true,
              },
            );
          }

          return true;
        }),
      );
    }),
  );
};
