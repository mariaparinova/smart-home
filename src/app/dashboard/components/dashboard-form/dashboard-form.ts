import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { VALIDATION_MESSAGES } from '../../../shared/constants/validation-messages';
import { SmartHomeApiService } from '../../../shared/services/smart-home-api.service';
import { DashboardStore } from '../../dashboard-store/dashboard-store';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../../shared/utils/form.utils';
import { DASHBOARD_FORM_LIMITS } from '../../../shared/constants/limits';

@Component({
  selector: 'app-dashboard-form',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './dashboard-form.html',
  styleUrl: './dashboard-form.scss',
})
export class DashboardForm {
  private dialogRef = inject(MatDialogRef<DashboardForm>);
  private smartHomeApiService = inject(SmartHomeApiService);
  private dashboardStore = inject(DashboardStore);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private submitErrorMessage = signal<string | null>(null);

  protected formErrorMessages = {
    id: {
      required: VALIDATION_MESSAGES.required,
      maxlength: VALIDATION_MESSAGES.getMaxLengthErrorMessage(DASHBOARD_FORM_LIMITS.ID_MAX_LENGTH),
      pattern: VALIDATION_MESSAGES.lowercaseLettersOnly,
      unique: VALIDATION_MESSAGES.mustBeUnique,
    },
    title: {
      required: VALIDATION_MESSAGES.required,
      maxlength: VALIDATION_MESSAGES.getMaxLengthErrorMessage(
        DASHBOARD_FORM_LIMITS.TITLE_MAX_LENGTH,
      ),
    },
    icon: {
      required: VALIDATION_MESSAGES.required,
    },
  };

  private uniqueIdValidator: ValidatorFn = (control) => {
    if (!control.value) {
      return null;
    }

    const isNotUnique = this.dashboardStore
      .dashboards()
      .some((dashboard) => dashboard.id === control.value);

    return isNotUnique ? { unique: true } : null;
  };

  protected dashboardForm = this.formBuilder.nonNullable.group({
    id: [
      '',
      {
        validators: [
          Validators.required,
          Validators.maxLength(DASHBOARD_FORM_LIMITS.ID_MAX_LENGTH),
          Validators.pattern(/^[a-z]+$/),
          this.uniqueIdValidator,
        ],
        updateOn: 'blur',
      },
    ],
    title: [
      '',
      [Validators.required, Validators.maxLength(DASHBOARD_FORM_LIMITS.TITLE_MAX_LENGTH)],
    ],
    icon: ['', [Validators.required]],
  });

  protected getErrorMessage = getErrorMessage;

  protected submitForm = (event: SubmitEvent) => {
    event.preventDefault();

    if (this.dashboardForm.invalid) {
      this.dashboardForm.markAllAsTouched();
      return;
    }

    const { id, title, icon } = this.dashboardForm.getRawValue();

    this.smartHomeApiService.createDashboard({ id, title, icon }).subscribe({
      next: () => {
        this.submitErrorMessage.set(null);
        this.dialogRef.close();
        this.dashboardStore.loadDashboards();
        this.router.navigate(['/dashboard', id]);
      },
      error: () => {
        this.submitErrorMessage.set('Unknown error occurred. Please try again later');
      },
    });
  };
}
