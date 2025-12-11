import { Component, inject, input, OnInit, signal, computed } from '@angular/core';
import { SingleCardSensor } from './single-card-sensor/single-card-sensor';
import { SingleCardDevice } from './single-card-device/single-card-device';
import { DashboardService } from '../../../../dashboard/dashboard-service';
import { CardData, DeviceData, SensorData } from '../../../../dashboard/dashboard.interfaces';

@Component({
  selector: 'app-single-card',
  imports: [SingleCardSensor, SingleCardDevice, SingleCardDevice],
  templateUrl: './single-card.html',
  styleUrl: './single-card.scss',
})
export class SingleCard implements OnInit {
  dashboardData = inject(DashboardService);
  tabId = input.required<string>();
  singleCardData = input.required<CardData>();
  sensorData = signal<SensorData | undefined>(undefined);

  deviceData = computed<DeviceData | undefined>(() => {
    const cardId = this.singleCardData().id;
    const tab = this.dashboardData.dashboardMockData().tabs.find((tab) => tab.id === this.tabId())!;
    const card = tab.cards.find((card) => card.id === cardId)!;

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
