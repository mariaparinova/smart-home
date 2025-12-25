import { Component, computed, inject, input } from '@angular/core';
import { MultiCard } from '../../../shared/components/cards/multi-card/multi-card';
import { SingleCard } from '../../../shared/components/cards/single-card/single-card';
import { DashboardService } from '../../../shared/services/dashboard-service';

@Component({
  selector: 'app-cards-list',
  imports: [MultiCard, SingleCard],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.scss',
})
export class CardsList {
  private dashboardService = inject(DashboardService);
  tabId = input.required<string>();

  contentForActiveTab = computed(() => {
    const dashboardResource = this.dashboardService.dashboardResource;

    if (!dashboardResource.hasValue()) {
      return [];
    }

    const dashboard = dashboardResource.value();
    const tab = dashboard.tabs.find((tab) => tab.id === this.tabId());

    if (!tab) {
      return [];
    }

    return tab.cards;
  });
}
