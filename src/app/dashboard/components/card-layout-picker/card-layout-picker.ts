import { Component, inject, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Card, CardType, Sensor } from '../../../shared/models/dashboard.models';
import { getCardInfo } from '../../../shared/components/cards/cards.utils';
import { DashboardStore } from '../../dashboard-store/dashboard-store';
import { generateCardId } from '../../dashboard-store/dashboard-store.utils';

const getSensorItems = (amountOfDevices: number): Sensor[] => {
  const items = [];

  for (let i = 0; i < amountOfDevices; i++) {
    items.push({
      type: 'sensor',
      label: 'weather',
      icon: 'cloud',
      value: {
        amount: 1,
        unit: 'clear',
      },
      id: generateCardId(),
    } as Sensor);
  }

  return items;
};

const CARDS_EXAMPLE: Card<Sensor>[] = [
  {
    id: 'card_1',
    title: 'Horizontal Layout',
    layout: CardType.Horizontal,
    items: getSensorItems(3),
  },
  {
    id: 'card_2',
    title: 'Vertical Layout',
    layout: CardType.Vertical,
    items: getSensorItems(3),
  },
  {
    id: 'card_3',
    title: 'Single card',
    layout: CardType.SingleDevice,
    items: getSensorItems(1),
  },
];

@Component({
  selector: 'app-card-layout-picker',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
  ],
  templateUrl: './card-layout-picker.html',
  styleUrl: './card-layout-picker.scss',
})
export class CardLayoutPicker {
  protected readonly getCardInfo = getCardInfo;
  protected readonly Layout = CardType;
  protected readonly cardsExample = CARDS_EXAMPLE;
  protected dashboardStore = inject(DashboardStore);
  protected dialog = inject(MatDialogRef<CardLayoutPicker>);
  selectedCardLayout = signal<CardType | undefined>(undefined);

  selectLayout(layout: CardType) {
    this.selectedCardLayout.set(layout);
  }

  addCardToActiveDashboard = () => {
    const layout = this.selectedCardLayout();

    if (!layout) {
      console.warn('Card type is not selected');
      return;
    }

    const tabId = this.dashboardStore.activeTabId();
    if (!tabId) {
      console.warn('Active tab is not selected');
      return;
    }

    const card: Card = {
      id: generateCardId(),
      title: '',
      layout: layout,
      items: [],
    };

    this.dashboardStore.addCardToActiveDashboard({ card, tabId });
    this.dialog.close();
  };
}
