export enum CardType {
  Horizontal = 'horizontalLayout',
  Vertical = 'verticalLayout',
  SingleDevice = 'singleDevice',
}

export interface SideBarItem {
  id: string;
  title: string;
  icon: string;
}

export interface Dashboard {
  id: string;
  tabs: Tab[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface Card<Item = Sensor | Device> {
  id: string;
  title: string;
  layout: CardType;
  items: Item[];
}

export interface Device {
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
  id: string;
}

export interface Sensor {
  type: 'sensor';
  icon: string;
  label: string;
  value: {
    amount: number;
    unit: string;
  };
  id: string;
}

export enum Direction {
  Left = 'left',
  Right = 'right',
}
