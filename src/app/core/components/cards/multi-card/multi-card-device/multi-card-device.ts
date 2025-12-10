import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeviceData, GlobalStore } from '../../../../global-store/global-store';
import { HighlightActiveDevice } from '../../../../directives/highlight-active-device/highlight-active-device';

@Component({
  selector: 'app-multi-card-device',
  imports: [MatIcon, MatSlideToggleModule, HighlightActiveDevice],
  templateUrl: './multi-card-device.html',
  styleUrl: './multi-card-device.scss',
  host: {
    '[class.vertical-layout]': 'isVerticalLayout()',
  },
})
export class MultiCardDevice {
  store = inject(GlobalStore);
  data = input.required<DeviceData>();
  tabId = input.required<string>();
  cardId = input.required<string>();
  isVerticalLayout = input.required<boolean>();

  handleChangeDeviceState = (params: MatSlideToggleChange) => {
    this.store.updateDeviceState({
      tabId: this.tabId(),
      cardId: this.cardId(),
      deviceLabel: this.data().label,
      newState: params.checked,
    });
  };
}
