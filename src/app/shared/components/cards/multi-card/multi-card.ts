import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MultiCardDevice } from './multi-card-device/multi-card-device';
import { MultiCardSensor } from './multi-card-sensor/multi-card-sensor';
import { DashboardService } from '../../../../dashboard/services/dashboard-service';
import { CardData } from '../../../../dashboard/models/dashboard.models';

@Component({
  selector: 'app-multi-card',
  imports: [MatSlideToggle, MultiCardDevice, MultiCardSensor],
  templateUrl: './multi-card.html',
  styleUrl: './multi-card.scss',
})
export class MultiCard implements OnInit {
  private dashboardService = inject(DashboardService);
  tabId = input.required<string>();
  multiCardData = input.required<CardData>();
  isVerticalCardLayout = signal(false);
  displayCommonToggle = signal(true);
  isCommonToggleOn = computed(() => {
    return this.multiCardData().items.some((item) => item.type === 'device' && item.state);
  });

  setAllDevicesStateInCard(params: MatSlideToggleChange) {
    this.dashboardService.setAllDevicesStateInCard({
      tabId: this.tabId(),
      cardId: this.multiCardData().id,
      state: params.checked,
    });
  }

  ngOnInit() {
    const devices = this.multiCardData().items.filter((item) => item.type === 'device');
    this.displayCommonToggle.set(devices.length > 1);

    this.isVerticalCardLayout.set(this.multiCardData().layout === 'verticalLayout');
  }
}
