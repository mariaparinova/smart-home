import { Component, computed, effect, inject, input } from '@angular/core';
import { MultiCard } from '../../../shared/components/cards/multi-card/multi-card';
import { SingleCard } from '../../../shared/components/cards/single-card/single-card';
import { DashboardStore } from '../../dashboard-store/dashboard-store';

@Component({
  selector: 'app-cards-list',
  imports: [MultiCard, SingleCard],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.scss',
})
export class CardsList {
  private dashboardStore = inject(DashboardStore);
  tabId = input.required<string>();

  cards = computed(() => {
    const activeDashboard = this.dashboardStore.activeDashboard();

    if (!activeDashboard) {
      return [];
    }

    const tab = activeDashboard.tabs.find((tab) => tab.id === this.tabId());

    if (!tab) {
      return [];
    }

    return tab.cards;
  });

  constructor() {
    effect(() => {
      this.dashboardStore.setActiveTab(this.tabId());
    });
  }
}
