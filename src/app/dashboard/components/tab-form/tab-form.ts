import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DashboardStore } from '../../dashboard-store/dashboard-store';
import { VALIDATION_MESSAGES } from '../../../shared/constants/validation-messages';
import { getErrorMessage } from '../../../shared/utils/form.utils';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TAB_FORM_LIMITS } from '../../../shared/constants/limits';

export enum TabFormMode {
  Create = 'create',
  Update = 'update',
}

export type TabFormData =
  | {
      mode: TabFormMode.Create;
      tabId: null;
    }
  | {
      mode: TabFormMode.Update;
      tabId: string;
    };

@Component({
  selector: 'app-tab-form',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './tab-form.html',
  styleUrl: './tab-form.scss',
})
export class TabForm implements OnInit {
  private dashboardStore = inject(DashboardStore);
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TabForm>);
  private dialogData = inject<TabFormData>(MAT_DIALOG_DATA);
  protected formTitle =
    this.dialogData.mode === TabFormMode.Create ? 'Create new tab' : 'Update tab';

  ngOnInit(): void {
    if (this.dialogData.mode === TabFormMode.Update) {
      const currentTabName = this.dashboardStore?.activeTab()?.title;

      if (currentTabName) {
        this.tabForm.setValue(currentTabName);
      }
    }
  }

  private uniqueValidator: ValidatorFn = (control) => {
    const controlValue = control.value?.trim().toLowerCase();
    const newId = controlValue.replaceAll(/\s+/g, '-');

    const isNotUnique = this.dashboardStore
      .activeDashboard()
      ?.tabs?.some(
        (tab) => tab.title.toLowerCase() === controlValue || tab.id.toLowerCase() === newId,
      );

    if (isNotUnique) {
      return { unique: true };
    }

    return null;
  };

  protected formErrorMessages = {
    tabTitle: {
      required: VALIDATION_MESSAGES.required,
      maxlength: VALIDATION_MESSAGES.getMaxLengthErrorMessage(TAB_FORM_LIMITS.TAB_NAME_MAX_LENGTH),
      unique: 'That value is already used as a Title or Id',
    },
  };

  protected tabForm = this.formBuilder.nonNullable.control('', {
    validators: [
      Validators.required,
      Validators.maxLength(TAB_FORM_LIMITS.TAB_NAME_MAX_LENGTH),
      this.uniqueValidator,
    ],
    updateOn: 'blur',
  });

  protected getErrorMessage = getErrorMessage;

  protected submitForm = (event: SubmitEvent) => {
    event.preventDefault();

    if (this.tabForm.invalid) {
      this.tabForm.markAllAsTouched();
      return;
    }

    const newTitle = this.tabForm.value.trim().toLowerCase();

    if (this.dialogData.mode === TabFormMode.Create) {
      this.dashboardStore.createEmptyTab({
        title: newTitle,
      });
    } else {
      this.dashboardStore.updateActiveTabTitle({
        newTitle,
      });
    }

    this.dialogRef.close();
  };
}
