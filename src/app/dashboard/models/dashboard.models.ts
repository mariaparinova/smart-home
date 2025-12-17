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
