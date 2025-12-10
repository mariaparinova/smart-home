import { Injectable, signal } from '@angular/core';

export interface DashboardData {
  tabs: TabContent[];
}

export interface TabContent {
  id: string;
  title: string;
  cards: CardData[];
}

export interface CardData {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout' | 'singleDevice';
  items: (SensorData | DeviceData)[];
}

export interface DeviceData {
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
}

export interface SensorData {
  type: 'sensor';
  icon: string;
  label: string;
  value: {
    amount: number;
    unit: string;
  };
}

interface DeviceStateParams {
  tabId: string;
  cardId: string;
  deviceLabel: string;
  newState: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalStore {
  data = signal<DashboardData>({
    tabs: [
      {
        id: 'overview',
        title: 'Overview',
        cards: [
          {
            id: 'balcony-weather',
            title: 'Balcony',
            layout: 'horizontalLayout',
            items: [
              {
                type: 'sensor',
                icon: 'thermostat',
                label: 'Temperature',
                value: {
                  amount: 18.5,
                  unit: '\u00B0C',
                },
              },
              {
                type: 'sensor',
                icon: 'water_drop',
                label: 'Humidity',
                value: {
                  amount: 72,
                  unit: '%',
                },
              },
              {
                type: 'sensor',
                icon: 'cloud',
                label: 'Weather',
                value: {
                  amount: 1,
                  unit: 'clear',
                },
              },
            ],
          },
          {
            id: 'indoor-rooms',
            title: 'Rooms',
            layout: 'verticalLayout',
            items: [
              {
                type: 'sensor',
                icon: 'co2',
                label: 'CO2 Sensor',
                value: {
                  amount: 520,
                  unit: 'ppm',
                },
              },
              {
                type: 'sensor',
                icon: 'water_drop',
                label: 'Humidity',
                value: {
                  amount: 45,
                  unit: '%',
                },
              },
            ],
          },
          {
            id: 'bathroom-motion',
            title: 'Bathroom',
            layout: 'singleDevice',
            items: [
              {
                type: 'sensor',
                icon: 'motion_photos_on',
                label: 'Motion Sensor',
                value: {
                  amount: 1,
                  unit: 'detected',
                },
              },
            ],
          },
          {
            id: 'living-room-mixed',
            title: 'Living Room',
            layout: 'verticalLayout',
            items: [
              {
                type: 'device',
                icon: 'lightbulb',
                label: 'Floor Lamp',
                state: true,
              },
              {
                type: 'device',
                icon: 'power',
                label: 'TV Socket',
                state: false,
              },
              {
                type: 'sensor',
                icon: 'thermostat',
                label: 'Temperature',
                value: {
                  amount: 23.5,
                  unit: '\u00B0C',
                },
              },
              {
                type: 'sensor',
                icon: 'co2',
                label: 'CO2 Sensor',
                value: {
                  amount: 610,
                  unit: 'ppm',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lights',
        title: 'Lights',
        cards: [
          {
            id: 'kitchen-light',
            title: 'Kitchen',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'lightbulb',
                label: 'Ceiling Light',
                state: true,
              },
            ],
          },
          {
            id: 'corridor-light',
            title: 'Corridor',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'lightbulb',
                label: 'Ceiling Light',
                state: false,
              },
            ],
          },
          {
            id: 'living-room-light',
            title: 'Living Room',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'lightbulb',
                label: 'Chandelier',
                state: true,
              },
            ],
          },
          {
            id: 'bedroom-light',
            title: 'Bedroom',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'lightbulb',
                label: 'Main Light',
                state: true,
              },
            ],
          },
          {
            id: 'bathroom-light',
            title: 'Bathroom',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'lightbulb',
                label: 'Ceiling Light',
                state: false,
              },
            ],
          },
        ],
      },
    ],
  });

  updateDeviceState(params: DeviceStateParams): void {
    const { tabId, cardId, deviceLabel, newState } = params;

    this.data.update((currentData) => {
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
    this.data.update((currentData) => {
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
}
