import { Component, inject, input, OnInit, signal, computed } from '@angular/core';
import { SingleCardSensor } from './single-card-sensor/single-card-sensor';
import { SingleCardDevice } from './single-card-device/single-card-device';
import {
  CardData,
  DeviceData,
  SensorData,
  TabContent,
} from '../../../../dashboard/models/dashboard.models';
import { DashboardService } from '../../../../dashboard/services/dashboard-service';

@Component({
  selector: 'app-single-card',
  imports: [SingleCardSensor, SingleCardDevice],
  templateUrl: './single-card.html',
  styleUrl: './single-card.scss',
})
export class SingleCard implements OnInit {
  private dashboardService = inject(DashboardService);
  tabId = input.required<string>();
  singleCardData = input.required<CardData>();
  sensorData = signal<SensorData | undefined>(undefined);

  deviceData = computed<DeviceData | undefined>(() => {
    const cardId = this.singleCardData().id;
    const tab = this.dashboardService
      .dashboardMockData()
      .tabs.find((tab: TabContent) => tab.id === this.tabId())!;
    const card = tab.cards.find((card: CardData) => card.id === cardId)!;

    return card.items.find((item) => item.type === 'device');
  });

  ngOnInit() {
    const firstItem = this.singleCardData().items[0];

    if (firstItem.type === 'sensor') {
      this.sensorData.set(firstItem);
      return;
    }
  }
}
