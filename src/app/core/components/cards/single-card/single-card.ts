import { Component, inject, input, OnInit, signal, computed } from '@angular/core';
import { CardData, DeviceData, GlobalStore, SensorData } from '../../../global-store/global-store';
import { SingleCardSensor } from './single-card-sensor/single-card-sensor';
import { SingleCardDevice } from './single-card-device/single-card-device';

@Component({
  selector: 'app-single-card',
  imports: [SingleCardSensor, SingleCardDevice, SingleCardDevice],
  templateUrl: './single-card.html',
  styleUrl: './single-card.scss',
})
export class SingleCard implements OnInit {
  globalStore = inject(GlobalStore);
  tabId = input.required<string>();
  singleCardData = input.required<CardData>();
  sensorData = signal<SensorData | undefined>(undefined);

  deviceData = computed<DeviceData | undefined>(() => {
    const cardId = this.singleCardData().id;
    const tab = this.globalStore.globalStoreData().tabs.find((tab) => tab.id === this.tabId())!;
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
