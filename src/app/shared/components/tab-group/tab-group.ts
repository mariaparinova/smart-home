import { Component, input, OnInit, output, signal } from '@angular/core';

export interface Tab {
  id: string;
  title: string;
}

@Component({
  selector: 'app-tab-group',
  imports: [],
  templateUrl: './tab-group.html',
  styleUrl: './tab-group.scss',
})
export class TabGroup implements OnInit {
  tabData = input.required<Tab[]>();
  activeTabId = signal('');
  changeTabEvent = output<string>();

  ngOnInit() {
    const firstTabId = this.tabData()[0]?.id;

    if (firstTabId) {
      this.activeTabId.set(firstTabId);
    }
  }

  changeActiveTab = (tabId: string) => {
    this.activeTabId.set(tabId);
    this.changeTabEvent.emit(tabId);
  };
}
