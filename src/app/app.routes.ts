import { RedirectCommand, Router, Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { CardsList } from './dashboard/components/cards-list/cards-list';
import { AuthService } from './shared/services/auth.service';
import { inject } from '@angular/core';
import { DashboardPlaceholder } from './dashboard/dashboard-placeholder';
import { DashboardDetails } from './dashboard/dashboard-details';
import { DashboardService } from './shared/services/dashboard-service';
import { filter, map, of, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Dashboard } from './shared/models/dashboard.models';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      const authService = inject(AuthService);
      return authService.isAuthenticated() ? '/dashboard' : '/login';
    },
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard-layout').then((module) => module.DashboardLayout),
    title: 'Dashboard - Smart Home',
    canActivate: [
      () => {
        const authService = inject(AuthService);

        if (!authService.isAuthenticated()) {
          const router = inject(Router);
          return new RedirectCommand(router.createUrlTree(['/login']), { replaceUrl: true });
        }

        return true;
      },
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardPlaceholder,
        canActivate: [
          () => {
            const dashboardService = inject(DashboardService);
            const router = inject(Router);

            return toObservable(dashboardService.dashboards).pipe(
              filter((dashboards) => !!dashboards),
              map((dashboards) => {
                if (dashboards.length > 0) {
                  return new RedirectCommand(
                    router.createUrlTree(['/dashboard', dashboards[0].id]),
                    {
                      replaceUrl: true,
                    },
                  );
                }

                return true;
              }),
            );
          },
        ],
      },
      {
        path: ':dashboardId',
        component: DashboardDetails,
        canActivate: [
          (route) => {
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
                const doesDashboardExist = dashboards.some(
                  (dashboard) => dashboard.id === dashboardId,
                );

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
                  filter(
                    (dashboard): dashboard is Dashboard =>
                      !!dashboard && dashboard.id === dashboardId,
                  ),
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
          },
        ],
        children: [
          {
            path: ':tabId',
            component: CardsList,
            canActivate: [
              (route) => {
                const dashboardService = inject(DashboardService);
                const router = inject(Router);
                const dashboardId = route.paramMap.get('dashboardId');

                return toObservable(dashboardService.dashboardResource.value).pipe(
                  filter(
                    (dashboard): dashboard is Dashboard =>
                      !!dashboard && dashboard.id === dashboardId,
                  ),
                  map((dashboard) => {
                    const tabs = dashboard.tabs;

                    if (tabs.length === 0) {
                      return new RedirectCommand(
                        router.createUrlTree(['/dashboard', dashboardId]),
                        {
                          replaceUrl: true,
                        },
                      );
                    }

                    const tabId = route.paramMap.get('tabId');
                    const doesTabExist = tabs.some((tab) => tab.id === tabId);

                    if (!doesTabExist) {
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
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./login-page/login-page').then((module) => module.LoginPage),
    title: 'Login - Smart Home',
    canActivate: [
      () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if (authService.isAuthenticated()) {
          return new RedirectCommand(router.createUrlTree(['/dashboard']), { replaceUrl: true });
        }

        return true;
      },
    ],
  },
  { path: '**', component: NotFound },
];
