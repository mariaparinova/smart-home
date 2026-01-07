import { patchState, signalStore, withMethods, withState, withComputed } from '@ngrx/signals';
import { SideBarItem } from '../../shared/models/dashboard.models';
import { SmartHomeApiService } from '../../shared/services/smart-home-api.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxResource } from '@angular/core/rxjs-interop';

interface DashboardState {
  dashboards: SideBarItem[];
  isDashboardsLoading: boolean;
  activeDashboardId: string | undefined;
  editModeEnabled: boolean;
}

const initialState: DashboardState = {
  dashboards: [],
  isDashboardsLoading: false,
  activeDashboardId: undefined,
  editModeEnabled: false,
};

export const DashboardStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods((store, smartHomeApiService = inject(SmartHomeApiService)) => ({
    loadDashboards: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isDashboardsLoading: true })),
        switchMap(() => {
          return smartHomeApiService.getDashboards().pipe(
            tapResponse({
              next: (dashboards) => {
                patchState(store, { dashboards });
              },
              error: () => {
                // pass
              },
              finalize: () => {
                patchState(store, { isDashboardsLoading: false });
              },
            }),
          );
        }),
      ),
    ),

    updateActiveDashboardId: (dashboardId: string | undefined) => {
      patchState(store, { activeDashboardId: dashboardId });
    },

    enterEditMode: () => {
      patchState(store, { editModeEnabled: true });
    },

    exitEditMode: () => {
      patchState(store, { editModeEnabled: false });
    },

    deleteDashboard: () => {
      return;
    },
  })),

  withComputed((store, smartHomeApiService = inject(SmartHomeApiService)) => {
    const activeDashboardResource = rxResource({
      params: () => {
        const dashboardId = store.activeDashboardId();

        if (!dashboardId) {
          return;
        }

        return { dashboardId };
      },
      stream: ({ params }) => smartHomeApiService.getDashboard(params.dashboardId),
    });

    return {
      activeDashboard: () => {
        return {
          value: activeDashboardResource.value.asReadonly(),
          status: activeDashboardResource.status,
          reload: activeDashboardResource.reload,
        };
      },
    };
  }),
);
