import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CardData, DeviceData, TabContent } from '../../../../../dashboard/models/dashboard.models';
import { HighlightActiveDevice } from '../../../../../directives/highlight-active-device/highlight-active-device';
import { DashboardService } from '../../../../../dashboard/services/dashboard-service';

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
  private dashboardService = inject(DashboardService);
  tabId = input.required<string>();
  cardId = input.required<string>();

  singleCardDeviceData = computed<DeviceData>(() => {
    const tab = this.dashboardService
      .dashboardMockData()
      .tabs.find((tab: TabContent) => tab.id === this.tabId())!;
    const card = tab.cards.find((card: CardData) => card.id === this.cardId())!;

    return card.items.find((item) => item.type === 'device')!;
  });

  handleChangeDeviceState = () => {
    this.dashboardService.updateDeviceState({
      tabId: this.tabId(),
      cardId: this.cardId(),
      deviceLabel: this.singleCardDeviceData().label,
      newState: !this.singleCardDeviceData().state,
    });
  };
}
