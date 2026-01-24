import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { HighlightActiveDevice } from '../../../../../directives/highlight-active-device/highlight-active-device';
import { Device } from '../../../../models/dashboard.models';
import { DashboardStore } from '../../../../../dashboard/dashboard-store/dashboard-store';

@Component({
  selector: 'app-single-card-device',
  imports: [MatIcon, HighlightActiveDevice, MatButtonToggle],
  templateUrl: './single-card-device.html',
  styleUrl: './single-card-device.scss',
  host: {
    class: 'single-card-content',
  },
})
export class SingleCardDevice {
  protected dashboardStore = inject(DashboardStore);
  singleCardDevice = input.required<Device>();
  cardId = input.required<string>();
}
