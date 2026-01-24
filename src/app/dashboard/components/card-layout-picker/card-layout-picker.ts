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
import { Card, CardType } from '../../../shared/models/dashboard.models';
import { getCardInfo } from '../../../shared/components/cards/cards.utils';
import { DashboardStore } from '../../dashboard-store/dashboard-store';
import { generateCardId } from '../../dashboard-store/dashboard-store.utils';
import { CARDS_EXAMPLE } from './card-layout-picker.utils';

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
  private dashboardStore = inject(DashboardStore);
  private dialog = inject(MatDialogRef<CardLayoutPicker>);
  protected getCardInfo = getCardInfo;
  protected Layout = CardType;
  protected cardsExample = CARDS_EXAMPLE;
  protected selectedCardLayout = signal<CardType | undefined>(undefined);

  protected selectLayout(layout: CardType) {
    this.selectedCardLayout.set(layout);
  }

  protected addCardToActiveDashboard = () => {
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
