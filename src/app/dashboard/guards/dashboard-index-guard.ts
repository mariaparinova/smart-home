import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

export const dashboardIndexGuard: CanActivateFn = () => {
  const dashboardService = inject(DashboardService);
  const router = inject(Router);

  return toObservable(dashboardService.dashboards).pipe(
    filter((dashboards) => !!dashboards),
    map((dashboards) => {
      if (dashboards.length > 0) {
        return new RedirectCommand(router.createUrlTree(['/dashboard', dashboards[0].id]), {
          replaceUrl: true,
        });
      }

      return true;
    }),
  );
};
