import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HighlightActiveDevice } from '../../../../../directives/highlight-active-device/highlight-active-device';
import { Device } from '../../../../models/dashboard.models';

@Component({
  selector: 'app-multi-card-device',
  imports: [MatIcon, MatSlideToggleModule, HighlightActiveDevice],
  templateUrl: './multi-card-device.html',
  styleUrl: './multi-card-device.scss',
  host: {
    class: 'multi-card-content',
    '[class.vertical-layout]': 'isVerticalLayout()',
  },
})
export class MultiCardDevice {
  multiCardDevice = input.required<Device>();
  tabId = input.required<string>();
  cardId = input.required<string>();
  isVerticalLayout = input.required<boolean>();

  handleChangeDeviceState = (params: MatSlideToggleChange) =>
    (this.multiCardDevice().state = params.checked);
}
