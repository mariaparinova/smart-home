import { Component, computed, inject, signal } from '@angular/core';
import { TabGroup } from '../shared/components/tab-group/tab-group';
import { MultiCard } from '../shared/components/cards/multi-card/multi-card';
import { SingleCard } from '../shared/components/cards/single-card/single-card';
import { DashboardService } from './dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [TabGroup, MultiCard, SingleCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  dashboardService = inject(DashboardService);
  tabs = this.dashboardService.dashboardMockData().tabs.map((tab) => {
    return {
      id: tab.id,
      title: tab.title,
    };
  });

  activeTabId = signal<string>(this.tabs[0].id);
  tabData = computed(
    () =>
      this.dashboardService.dashboardMockData().tabs.find((tab) => tab.id === this.activeTabId())!,
  );

  setActiveTab = (tabId: string) => {
    this.activeTabId.set(tabId);
  };
}
