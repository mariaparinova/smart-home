export interface LoginRequestDto {
  userName: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

export interface UserProfileResponseDto {
  fullName: string;
  initials: string;
}
export interface SideBarItemDto {
  id: string;
  title: string;
  icon: string;
}

export interface DashboardDto {
  tabs: TabDto[];
}

export interface TabDto {
  id: string;
  title: string;
  cards: CardDto[];
}

export interface CardDto {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout' | 'singleDevice';
  items: (SensorDto | DeviceDto)[];
}

export interface DeviceDto {
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
}

export interface SensorDto {
  type: 'sensor';
  icon: string;
  label: string;
  value: {
    amount: number;
    unit: string;
  };
}
