import { Injectable, signal } from '@angular/core';
import { dashboardMockData } from '../dashboard-mock-data';
import { DashboardData, DeviceData } from '../models/dashboard.models';

interface DeviceStateParams {
  tabId: string;
  cardId: string;
  deviceLabel: string;
  newState: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboardMockData = signal<DashboardData>(dashboardMockData);

  updateDeviceState(params: DeviceStateParams): void {
    const { tabId, cardId, deviceLabel, newState } = params;

    this.dashboardMockData.update((currentData) => {
      const newData = structuredClone(currentData);
      const tab = newData.tabs.find((tab) => tab.id === tabId)!;
      const card = tab.cards.find((card) => card.id === cardId)!;
      const device = card.items.find(
        (item) => item.type === 'device' && item.label === deviceLabel,
      ) as DeviceData;

      device.state = newState;

      return newData;
    });
  }

  setAllDevicesStateInCard({
    tabId,
    cardId,
    state,
  }: {
    tabId: string;
    cardId: string;
    state: boolean;
  }): void {
    this.dashboardMockData.update((currentData) => {
      const newData = structuredClone(currentData);
      const tab = newData.tabs.find((tab) => tab.id === tabId)!;
      const card = tab.cards.find((card) => card.id === cardId)!;

      for (const item of card.items) {
        if (item.type === 'device') {
          item.state = state;
        }
      }

      return newData;
    });
  }

  getDataByTabId(tabId: string) {
    return this.dashboardMockData().tabs.find((tab) => tab.id === tabId);
  }
}
