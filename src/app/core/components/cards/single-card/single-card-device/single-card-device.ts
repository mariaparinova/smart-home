import { Component, computed, inject, input } from '@angular/core';
import { DeviceData, GlobalStore } from '../../../../global-store/global-store';
import { MatIcon } from '@angular/material/icon';
import { HighlightActiveDevice } from '../../../../directives/highlight-active-device/highlight-active-device';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-single-card-device',
  imports: [MatIcon, HighlightActiveDevice, MatIconButton],
  templateUrl: './single-card-device.html',
  styleUrl: './single-card-device.scss',
  host: {
    class: 'single-card-content',
  },
})
export class SingleCardDevice {
  tabId = input.required<string>();
  cardId = input.required<string>();
  globalStore = inject(GlobalStore);

  data = computed<DeviceData>(() => {
    const tab = this.globalStore.data().tabs.find((tab) => tab.id === this.tabId())!;
    const card = tab.cards.find((card) => card.id === this.cardId())!;

    return card.items.find((item) => item.type === 'device')!;
  });

  handleChangeDeviceState = () => {
    this.globalStore.updateDeviceState({
      tabId: this.tabId(),
      cardId: this.cardId(),
      deviceLabel: this.data().label,
      newState: !this.data().state,
    });
  };
}
