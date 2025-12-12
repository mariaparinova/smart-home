import { Component, computed, inject, input } from '@angular/core';
import { MultiCard } from '../../../shared/components/cards/multi-card/multi-card';
import { SingleCard } from '../../../shared/components/cards/single-card/single-card';
import { DashboardService } from '../../services/dashboard-service';

@Component({
  selector: 'app-cards-list',
  imports: [MultiCard, SingleCard],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.scss',
})
export class CardsList {
  private dashboardService = inject(DashboardService);
  activeTabId = input.required<string>();

  contentForActiveTab = computed(
    () =>
      this.dashboardService.dashboardMockData().tabs.find((tab) => tab.id === this.activeTabId())!
        .cards,
  );
}
