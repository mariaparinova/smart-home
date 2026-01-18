import { Component, computed, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CardType, Device, Sensor } from '../../../shared/models/dashboard.models';
import { DashboardStore } from '../../dashboard-store/dashboard-store';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

interface EntitiesCardConfigurationDialogData {
  tabId: string;
  cardIndex: number;
  cardId: string;
}

@Component({
  selector: 'app-card-configuration',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    MatDialogTitle,
    MatIconButton,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose,
    MatOption,
    MatAutocompleteTrigger,
    MatAutocomplete,
  ],
  templateUrl: './card-configuration.component.html',
  styleUrl: './card-configuration.component.scss',
})
export class EntitiesCardConfiguration implements OnInit {
  private dashboardStore = inject(DashboardStore);
  private dialogRef = inject(MatDialogRef<EntitiesCardConfiguration>);
  readonly dialogData = inject<EntitiesCardConfigurationDialogData>(MAT_DIALOG_DATA);
  readonly cardId = this.dialogData.cardId;

  private readonly optionsCatalog = computed(() => this.dashboardStore.devicesCatalog());

  alreadySelectedOptions = signal<(Device | Sensor)[]>([]);

  readonly entityControl = new FormControl<Device | Sensor | string>('', {
    nonNullable: true,
  });

  readonly searchTerm = toSignal(this.entityControl.valueChanges, { initialValue: '' });

  readonly card = computed(() => {
    return this.dashboardStore.activeTab()?.cards.find((card) => card.id === this.cardId);
  });

  readonly availableOptions = computed(() => {
    const catalog = this.optionsCatalog();
    const selectedIds = new Set(this.alreadySelectedOptions().map((option) => option.id));
    const cardType = this.card()?.layout;
    const searchTermRaw = this.searchTerm();
    const searchTerm = typeof searchTermRaw === 'string' ? searchTermRaw.toLowerCase().trim() : '';

    return catalog.filter((option) => {
      const alreadySelected = selectedIds.has(option.id);
      if (alreadySelected) {
        return false;
      }

      const matchesType = cardType !== CardType.Horizontal || option.type === 'sensor';
      if (!matchesType) {
        return false;
      }

      return option.label.toLowerCase().includes(searchTerm);
    });
  });

  readonly titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  ngOnInit() {
    const card = this.card();
    if (!card) {
      return;
    }

    let cardItems = card.items;

    if (card.layout === CardType.SingleDevice) {
      const firstItem = cardItems[0];
      cardItems = firstItem ? [firstItem] : [];
    }

    this.alreadySelectedOptions.set(cardItems);
  }

  private getTitleInputValue() {
    return this.titleInput()?.nativeElement.value;
  }

  deleteEntity(id: string) {
    this.alreadySelectedOptions.update((entities) =>
      entities?.filter((entity) => entity.id !== id),
    );
  }

  applyConfiguration() {
    const cardTitle = this.getTitleInputValue() || this.card()?.title || '';

    this.dashboardStore.applyCardConfiguration({
      cardId: this.cardId,
      items: this.alreadySelectedOptions(),
      title: cardTitle,
    });
    this.dialogRef.close();
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent) {
    const entity = $event.option.value;

    if (this.card()?.layout === CardType.SingleDevice) {
      this.alreadySelectedOptions.set([entity]);
    } else {
      this.alreadySelectedOptions.update((entities) => [...entities, entity]);
    }

    this.entityControl.setValue('');
  }
}
