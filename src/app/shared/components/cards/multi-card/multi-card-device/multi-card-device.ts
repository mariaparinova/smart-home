import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DashboardService } from '../../../../../dashboard/services/dashboard-service';
import { DeviceData } from '../../../../../dashboard/models/dashboard.models';
import { HighlightActiveDevice } from '../../../../../directives/highlight-active-device/highlight-active-device';

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
  private dashboardService = inject(DashboardService);
  multiCardDeviceData = input.required<DeviceData>();
  tabId = input.required<string>();
  cardId = input.required<string>();
  isVerticalLayout = input.required<boolean>();

  handleChangeDeviceState = (params: MatSlideToggleChange) => {
    this.dashboardService.updateDeviceState({
      tabId: this.tabId(),
      cardId: this.cardId(),
      deviceLabel: this.multiCardDeviceData().label,
      newState: params.checked,
    });
  };
}
