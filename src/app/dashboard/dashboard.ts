import { Component, inject, signal } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { TabContent } from './models/dashboard.models';
import { CardsList } from './components/cards-list/cards-list';
import { DashboardService } from './services/dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [MatTab, CardsList, MatTabGroup],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private dashboardService = inject(DashboardService);

  tabs = this.dashboardService.dashboardMockData().tabs.map((tab: TabContent) => {
    return {
      id: tab.id,
      title: tab.title,
    };
  });

  activeTabId = signal<string>(this.tabs[0].id);

  setActiveTab = (params: MatTabChangeEvent) => {
    const tabId = params.tab.id;

    if (!tabId) {
      console.error('Tab id is not defined');
      return;
    }

    this.activeTabId.set(tabId);
  };
}
