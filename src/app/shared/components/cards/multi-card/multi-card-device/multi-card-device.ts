import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HighlightActiveDevice } from '../../../../../directives/highlight-active-device/highlight-active-device';
import { Device } from '../../../../models/dashboard.models';
import { DashboardStore } from '../../../../../dashboard/dashboard-store/dashboard-store';

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
  dashboardStore = inject(DashboardStore);

  multiCardDevice = input.required<Device>();
  cardId = input.required<string>();
  isVerticalLayout = input.required<boolean>();

  handleChangeDeviceState = () => {
    // todo: implement
  };
}
