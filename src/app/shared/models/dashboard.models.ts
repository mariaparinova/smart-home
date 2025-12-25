export interface Dashboard {
  id: string;
  tabs: Tab[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout' | 'singleDevice';
  items: (Sensor | Device)[];
}

export interface Device {
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
}

export interface Sensor {
  type: 'sensor';
  icon: string;
  label: string;
  value: {
    amount: number;
    unit: string;
  };
}
