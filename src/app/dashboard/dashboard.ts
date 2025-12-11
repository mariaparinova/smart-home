import { Component, computed, inject, signal } from '@angular/core';
import { TabGroup } from '../core/components/tab-group/tab-group';
import { GlobalStore } from '../core/global-store/global-store';
import { MultiCard } from '../core/components/cards/multi-card/multi-card';
import { SingleCard } from '../core/components/cards/single-card/single-card';

@Component({
  selector: 'app-dashboard',
  imports: [TabGroup, MultiCard, SingleCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  store = inject(GlobalStore);
  tabs = this.store.globalStoreData().tabs.map((tab) => {
    return {
      id: tab.id,
      title: tab.title,
    };
  });

  activeTabId = signal<string>(this.tabs[0].id);
  tabData = computed(
    () => this.store.globalStoreData().tabs.find((tab) => tab.id === this.activeTabId())!,
  );

  setActiveTab = (tabId: string) => {
    this.activeTabId.set(tabId);
  };
}
