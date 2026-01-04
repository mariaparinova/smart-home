import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MultiCardDevice } from './multi-card-device/multi-card-device';
import { MultiCardSensor } from './multi-card-sensor/multi-card-sensor';
import { Card } from '../../../models/dashboard.models';

@Component({
  selector: 'app-multi-card',
  imports: [MatSlideToggle, MultiCardDevice, MultiCardSensor],
  templateUrl: './multi-card.html',
  styleUrl: './multi-card.scss',
})
export class MultiCard implements OnInit {
  tabId = input.required<string>();
  multiCard = input.required<Card>();
  isVerticalCardLayout = signal(false);
  displayCommonToggle = signal(true);
  isCommonToggleOn = computed(() => {
    return this.multiCard().items.some((item) => item.type === 'device' && item.state);
  });

  setAllDevicesStateInCard(params: MatSlideToggleChange) {
    this.multiCard().items.forEach((item) => {
      if (item.type === 'device') {
        item.state = params.checked;
      }
    });
  }

  ngOnInit() {
    const devices = this.multiCard().items.filter((item) => item.type === 'device');
    this.displayCommonToggle.set(devices.length > 1);

    this.isVerticalCardLayout.set(this.multiCard().layout === 'verticalLayout');
  }
}
