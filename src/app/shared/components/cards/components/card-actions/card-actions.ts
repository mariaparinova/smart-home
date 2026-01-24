import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DashboardStore } from '../../../../../dashboard/dashboard-store/dashboard-store';
import { Direction } from '../../../../models/dashboard.models';
import { MatDialog } from '@angular/material/dialog';
import { EntitiesCardConfiguration } from '../../../../../dashboard/components/card-configuration/card-configuration.component';

@Component({
  selector: 'app-card-actions',
  imports: [MatIcon, MatIconButton, MatButton],
  templateUrl: './card-actions.html',
  styleUrl: './card-actions.scss',
})
export class CardActions {
  protected Direction = Direction;
  cardId = input.required<string>();
  private dialog = inject(MatDialog);
  protected dashboardStore = inject(DashboardStore);
  private totalCards = computed(() => this.dashboardStore.activeTab()?.cards);
  protected cardIndex = computed(() =>
    this.totalCards()?.findIndex((card) => card.id === this.cardId()),
  );

  protected isFirstCard = computed(() => {
    return this.totalCards()?.at(0)?.id === this.cardId();
  });

  protected isLastCard = computed(() => {
    return this.totalCards()?.at(-1)?.id === this.cardId();
  });

  protected moveCard = (direction: Direction) => {
    const tabId = this.dashboardStore.activeTabId();

    if (!tabId) {
      return;
    }

    this.dashboardStore.reorderCard({
      tabId,
      cardId: this.cardId(),
      direction,
    });
  };

  protected openCreateCardItemsDialog() {
    this.dialog.open(EntitiesCardConfiguration, {
      data: {
        cardId: this.cardId(),
      },
    });
  }
}
