import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CardData, GlobalStore } from '../../../global-store/global-store';
import { MultiCardDevice } from './multi-card-device/multi-card-device';
import { MultiCardSensor } from './multi-card-sensor/multi-card-sensor';

@Component({
  selector: 'app-multi-card',
  imports: [MatSlideToggle, MultiCardDevice, MultiCardSensor],
  templateUrl: './multi-card.html',
  styleUrl: './multi-card.scss',
})
export class MultiCard implements OnInit {
  globalStore = inject(GlobalStore);
  tabId = input.required<string>();
  data = input.required<CardData>();
  isVerticalCardLayout = signal(false);
  displayCommonToggle = signal(true);
  isCommonToggleOn = computed(() => {
    return this.data().items.some((item) => item.type === 'device' && item.state);
  });

  setAllDevicesStateInCard(params: MatSlideToggleChange) {
    this.globalStore.setAllDevicesStateInCard({
      tabId: this.tabId(),
      cardId: this.data().id,
      state: params.checked,
    });
  }

  ngOnInit() {
    const devices = this.data().items.filter((item) => item.type === 'device');
    this.displayCommonToggle.set(devices.length > 1);

    this.isVerticalCardLayout.set(this.data().layout === 'verticalLayout');
  }
}
