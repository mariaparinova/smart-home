import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import {
  Card,
  Dashboard,
  Device,
  Direction,
  Sensor,
  SideBarItem,
} from '../../shared/models/dashboard.models';
import { SmartHomeApiService } from '../../shared/services/smart-home-api.service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { swapArrayItems } from '../../shared/utils/array.utils';
import { generateTabId } from './dashboard-store.utils';

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

interface DashboardState {
  dashboards: SideBarItem[];
  dashboardsStatus: Status;

  activeDashboardId: string | undefined;
  activeDashboard: Dashboard | undefined;
  activeDashboardStatus: Status;

  activeTabId: string | undefined;

  editModeEnabled: boolean;
  dashboardBeforeEdit: Dashboard | undefined;
  deleteDashboardStatus: Status;

  devicesCatalog: (Sensor | Device)[];
}

const initialState: DashboardState = {
  dashboards: [],
  dashboardsStatus: Status.Idle,

  activeDashboardId: undefined,
  activeDashboard: undefined,
  activeDashboardStatus: Status.Idle,

  activeTabId: undefined,

  editModeEnabled: false,
  dashboardBeforeEdit: undefined,
  deleteDashboardStatus: Status.Idle,

  devicesCatalog: [],
};

export const DashboardStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ activeDashboard, activeTabId }) => ({
    activeTab: computed(() => activeDashboard()?.tabs.find((tab) => tab.id === activeTabId())),
  })),

  withMethods(
    (store, smartHomeApiService = inject(SmartHomeApiService), router = inject(Router)) => {
      const methods = {
        reorderTab(params: { tabId: string; direction: Direction }) {
          const { tabId, direction } = params;
          const activeDashboard = store.activeDashboard();

          if (!activeDashboard) {
            return;
          }

          const tabIndex = activeDashboard.tabs.findIndex((tab) => tab.id === tabId);
          const newTabIndex = direction === Direction.Left ? tabIndex - 1 : tabIndex + 1;

          if (newTabIndex < 0 || newTabIndex === activeDashboard.tabs.length) {
            return;
          }

          const reorderedTabs = [...activeDashboard.tabs];

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: swapArrayItems(reorderedTabs, tabIndex, newTabIndex),
            },
          });
        },

        reorderCard(params: { tabId: string; cardId: string; direction: Direction }) {
          const { tabId, cardId, direction } = params;
          const activeDashboard = store.activeDashboard();

          if (!activeDashboard) {
            return;
          }

          const tab = activeDashboard.tabs.find((tab) => tab.id === tabId);

          if (!tab) {
            return;
          }

          const cardIndex = tab.cards.findIndex((card) => card.id === cardId);
          const newCardIndex = direction === Direction.Left ? cardIndex - 1 : cardIndex + 1;

          if (newCardIndex < 0 || newCardIndex === tab.cards.length) {
            return;
          }

          const reorderedCards = swapArrayItems([...tab.cards], cardIndex, newCardIndex);

          patchState(store, () => ({
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.map((tab) => {
                if (tab.id !== tabId) {
                  return tab;
                }

                return { ...tab, cards: reorderedCards };
              }),
            },
          }));
        },

        enterEditMode() {
          patchState(store, {
            dashboardBeforeEdit: structuredClone(store.activeDashboard()),
            editModeEnabled: true,
          });
        },

        exitEditMode() {
          patchState(store, {
            dashboardBeforeEdit: undefined,
            editModeEnabled: false,
          });
        },

        discardChanges() {
          patchState(store, { activeDashboard: structuredClone(store.dashboardBeforeEdit()) });
          methods.exitEditMode();
        },

        createEmptyTab(params: { title: string }) {
          const { title } = params;
          const activeDashboard = store.activeDashboard();

          if (!activeDashboard) {
            return;
          }

          const clonedTabs = [
            ...activeDashboard.tabs,
            { id: generateTabId(title), title, cards: [] },
          ];

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: clonedTabs,
            },
          });
        },

        updateActiveTabTitle(params: { newTitle: string }) {
          const { newTitle } = params;

          const activeDashboard = store.activeDashboard();
          if (!activeDashboard) {
            return;
          }

          const activeTabId = store.activeTabId();
          if (!activeTabId) {
            return;
          }

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.map((tab) => {
                if (tab.id !== activeTabId) {
                  return tab;
                }

                return { ...tab, title: newTitle };
              }),
            },
          });
        },

        setActiveTab(tabId: string | undefined) {
          patchState(store, { activeTabId: tabId });
        },

        deleteActiveTab() {
          const activeDashboard = store.activeDashboard();
          if (!activeDashboard) {
            return;
          }

          const activeTabId = store.activeTabId();

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.filter((tab) => tab.id !== activeTabId) || [],
            },
          });
        },

        addCardToActiveDashboard(params: { card: Card; tabId: string }) {
          const { card, tabId } = params;

          const activeDashboard = store.activeDashboard();
          if (!activeDashboard) {
            return;
          }
          const tab = activeDashboard.tabs.find((tab) => tab.id === tabId);
          if (!tab) {
            return;
          }

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.map((tab) =>
                tab.id === tabId ? { ...tab, cards: [...tab.cards, card] } : tab,
              ),
            },
          });
        },

        deleteCardFromActiveDashboard(cardId: string) {
          const activeDashboard = store.activeDashboard();
          if (!activeDashboard) {
            return;
          }

          const tabId = store.activeTabId();

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.map((tab) => {
                if (tab.id !== tabId) {
                  return tab;
                }

                return {
                  ...tab,
                  cards: tab.cards.filter((card) => card.id !== cardId),
                };
              }),
            },
          });
        },

        addItemToCard(params: { tabId: string; cardId: string; item: Device | Sensor }) {
          const { tabId, cardId, item } = params;

          const activeDashboard = store.activeDashboard();
          if (!activeDashboard) {
            return;
          }

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.map((tab) => {
                if (tab.id !== tabId) {
                  return tab;
                }

                return {
                  ...tab,
                  cards: tab.cards.map((card) => {
                    if (card.id !== cardId) {
                      return card;
                    }

                    return {
                      ...card,
                      items: [...card.items, item],
                    };
                  }),
                };
              }),
            },
          });
        },

        applyCardConfiguration(params: {
          cardId: string;
          items: (Sensor | Device)[];
          title: string;
        }) {
          const { cardId, items, title } = params;

          const activeDashboard = store.activeDashboard();
          if (!activeDashboard) {
            return;
          }

          const tabId = store.activeTabId();
          if (!tabId) {
            return;
          }

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.map((tab) => {
                if (tab.id !== tabId) {
                  return tab;
                }

                return {
                  ...tab,
                  cards: tab.cards.map((card) => {
                    if (card.id !== cardId) {
                      return card;
                    }

                    return {
                      ...card,
                      title,
                      items,
                    };
                  }),
                };
              }),
            },
          });
        },

        cancelCardConfiguration(cardId: string) {
          const activeDashboard = store.activeDashboard();
          if (!activeDashboard) {
            return;
          }

          const tabId = store.activeTabId();
          if (!tabId) {
            return;
          }

          patchState(store, {
            activeDashboard: {
              ...activeDashboard,
              tabs: activeDashboard.tabs.map((tab) => {
                if (tab.id !== tabId) {
                  return tab;
                }

                return {
                  ...tab,
                  cards: tab.cards.map((card, index) => {
                    if (card.id !== cardId) {
                      return card;
                    }

                    const cardBeforeEditing = store
                      .dashboardBeforeEdit()
                      ?.tabs.find((tab) => tab.id === tabId)?.cards[index];
                    const cardTitleBeforeEditing = cardBeforeEditing?.title || '';
                    const cardItemsBeforeEditing = cardBeforeEditing?.items || [];

                    return {
                      ...card,
                      title: cardTitleBeforeEditing,
                      items: [...cardItemsBeforeEditing],
                    };
                  }),
                };
              }),
            },
          });
        },

        loadDevicesCatalog: rxMethod<void>(
          pipe(
            switchMap(() => {
              return smartHomeApiService.getDevices().pipe(
                tapResponse({
                  next: (devices) => {
                    patchState(store, {
                      devicesCatalog: devices,
                    });
                  },
                  error: () => {
                    patchState(store, { devicesCatalog: [] });
                  },
                }),
              );
            }),
          ),
        ),

        loadDashboards: rxMethod<void>(
          pipe(
            tap(() => patchState(store, { dashboardsStatus: Status.Loading })),
            switchMap(() => {
              return smartHomeApiService.getDashboards().pipe(
                tapResponse({
                  next: (dashboards) => {
                    patchState(store, { dashboards, dashboardsStatus: Status.Success });
                  },
                  error: () => {
                    patchState(store, { dashboardsStatus: Status.Error });
                  },
                }),
              );
            }),
          ),
        ),

        updateActiveDashboardId: rxMethod<string>(
          pipe(
            tap(() => patchState(store, { activeDashboardStatus: Status.Loading })),
            switchMap((dashboardId) => {
              return smartHomeApiService.getDashboard(dashboardId).pipe(
                tapResponse({
                  next: (dashboard) => {
                    patchState(store, {
                      activeDashboardId: dashboardId,
                      activeDashboard: dashboard,
                      activeDashboardStatus: Status.Success,
                      dashboardBeforeEdit: undefined,
                      editModeEnabled: false,
                    });
                  },
                  error: () => {
                    patchState(store, { activeDashboardStatus: Status.Error });
                  },
                }),
              );
            }),
          ),
        ),

        updateDashboard: rxMethod<void>(
          pipe(
            tap(() => patchState(store, { activeDashboardStatus: Status.Loading })),
            switchMap(() => {
              return smartHomeApiService.updateDashboard(store.activeDashboard()!).pipe(
                tapResponse({
                  next: (updatedDashboard) => {
                    patchState(store, {
                      activeDashboardStatus: Status.Success,
                    });
                    const targetId = updatedDashboard.tabs?.[0]?.id;

                    if (targetId) {
                      router.navigate(['/dashboard', updatedDashboard.id, targetId], {
                        replaceUrl: true,
                      });
                    } else {
                      router.navigate(['/dashboard', updatedDashboard.id], { replaceUrl: true });
                    }
                  },
                  error: (error) => {
                    console.warn(error);
                  },
                }),
              );
            }),
          ),
        ),

        deleteDashboard: rxMethod<string>(
          pipe(
            tap(() => patchState(store, { deleteDashboardStatus: Status.Loading })),
            switchMap((dashboardId) => {
              return smartHomeApiService.deleteDashboard(dashboardId).pipe(
                tapResponse({
                  next: () => {
                    const updatedDashboards = store
                      .dashboards()
                      .filter((dashboard) => dashboard.id !== dashboardId);
                    patchState(store, {
                      deleteDashboardStatus: Status.Success,
                      dashboards: updatedDashboards,
                    });
                    if (updatedDashboards.length > 0) {
                      router.navigate(['/dashboard', updatedDashboards[0].id], {
                        replaceUrl: true,
                      });
                    } else {
                      router.navigate(['/dashboard'], { replaceUrl: true });
                    }
                  },
                  error: () => {
                    patchState(store, { deleteDashboardStatus: Status.Error });
                  },
                }),
              );
            }),
          ),
        ),
      };

      return methods;
    },
  ),
);
