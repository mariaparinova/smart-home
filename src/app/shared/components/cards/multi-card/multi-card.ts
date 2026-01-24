import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MultiCardDevice } from './multi-card-device/multi-card-device';
import { MultiCardSensor } from './multi-card-sensor/multi-card-sensor';
import { Card } from '../../../models/dashboard.models';
import { CardActions } from '../components/card-actions/card-actions';
import { DashboardStore } from '../../../../dashboard/dashboard-store/dashboard-store';
import { EMPTY_CARD_MESSAGE } from '../messages';

@Component({
  selector: 'app-multi-card',
  imports: [MatSlideToggle, MultiCardDevice, MultiCardSensor, CardActions],
  templateUrl: './multi-card.html',
  styleUrl: './multi-card.scss',
  host: {
    '[class.disabled]': 'dashboardStore.editModeEnabled()',
  },
})
export class MultiCard implements OnInit {
  multiCard = input.required<Card>();
  protected dashboardStore = inject(DashboardStore);
  protected emptyCardMessage = EMPTY_CARD_MESSAGE;
  protected isVerticalCardLayout = signal(false);
  protected displayCommonToggle = signal(true);

  private card = computed(() => {
    const initCard = this.multiCard();
    if (!initCard) {
      return;
    }

    const activeTab = this.dashboardStore.activeTab();
    if (!activeTab) {
      return;
    }

    return activeTab.cards.find((card) => card.id === initCard.id);
  });

  protected isCommonToggleOn = computed(() => {
    return this.card()?.items.some((item) => item.type === 'device' && item.state);
  });

  ngOnInit(): void {
    this.setInitCommonToggleState();
    this.setCardLayout();
  }

  protected setAllDevicesStateInCard(event: MatSlideToggleChange) {
    const card = this.card();
    const deviceIds: string[] = [];

    card?.items.forEach((item) => {
      if (item.type === 'device') {
        deviceIds.push(item.id);
      }
    });

    if (!card || !deviceIds.length) {
      return;
    }

    this.dashboardStore.toggleAllDevices({ cardId: card.id, deviceIds, state: event.checked });
  }

  private setInitCommonToggleState() {
    const multiCard = this.multiCard();
    if (!multiCard) {
      return;
    }

    const devices = multiCard.items.filter((item) => item.type === 'device');

    this.displayCommonToggle.set(devices.length > 1);
  }

  private setCardLayout() {
    const multiCard = this.multiCard();
    if (!multiCard) {
      return;
    }

    this.isVerticalCardLayout.set(multiCard.layout === 'verticalLayout');
  }
}
