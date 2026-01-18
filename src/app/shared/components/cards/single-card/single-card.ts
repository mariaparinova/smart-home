import { Component, computed, inject, input } from '@angular/core';
import { SingleCardSensor } from './single-card-sensor/single-card-sensor';
import { SingleCardDevice } from './single-card-device/single-card-device';
import { Card } from '../../../models/dashboard.models';
import { CardActions } from '../components/card-actions/card-actions';
import { DashboardStore } from '../../../../dashboard/dashboard-store/dashboard-store';
import { EMPTY_CARD_MESSAGE } from '../messages';

@Component({
  selector: 'app-single-card',
  imports: [SingleCardSensor, SingleCardDevice, CardActions],
  templateUrl: './single-card.html',
  styleUrl: './single-card.scss',
  host: {
    '[class.disabled]': 'dashboardStore.editModeEnabled()',
  },
})
export class SingleCard {
  protected readonly EMPTY_CARD_MESSAGE = EMPTY_CARD_MESSAGE;

  dashboardStore = inject(DashboardStore);

  singleCard = input.required<Card>();

  sensor = computed(() => {
    const firstItem = this.singleCard().items[0];
    return firstItem?.type === 'sensor' ? firstItem : undefined;
  });

  device = computed(() => {
    const firstItem = this.singleCard().items[0];
    return firstItem?.type === 'device' ? firstItem : undefined;
  });

  cards = computed(() => {
    return this.dashboardStore.activeTab()?.cards || [];
  });
}
