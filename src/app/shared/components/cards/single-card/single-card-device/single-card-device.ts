import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { HighlightActiveDevice } from '../../../../../directives/highlight-active-device/highlight-active-device';
import { Device } from '../../../../models/dashboard.models';
import { DashboardStore } from '../../../../../dashboard/dashboard-store/dashboard-store';

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
  dashboardStore = inject(DashboardStore);
  singleCardDevice = input.required<Device>();

  handleChangeDeviceState = () => {
    // todo: implement
  };
}
