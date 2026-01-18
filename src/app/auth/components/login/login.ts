import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { VALIDATION_MESSAGES } from '../../../shared/constants/validation-messages';
import { getErrorMessage } from '../../../shared/utils/form.utils';

const USERNAME_MIN_LENGTH = 2;
const PASSWORD_MIN_LENGTH = 2;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatError, MatInput, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  submitErrorMessage = signal<string | null>(null);

  formErrorMessages = {
    userName: {
      required: VALIDATION_MESSAGES.required,
      minlength: VALIDATION_MESSAGES.getMinLengthErrorMessage(USERNAME_MIN_LENGTH),
      pattern: VALIDATION_MESSAGES.mustHasLetterOnly,
    },
    password: {
      required: VALIDATION_MESSAGES.required,
      minlength: VALIDATION_MESSAGES.getMinLengthErrorMessage(PASSWORD_MIN_LENGTH),
    },
  };

  loginForm = this.formBuilder.nonNullable.group({
    userName: [
      'Sparks',
      [
        Validators.required,
        Validators.minLength(USERNAME_MIN_LENGTH),
        Validators.pattern(/^[a-zA-Z]{2,}$/),
      ],
    ],
    password: ['consectetur', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)]],
  });

  getErrorMessage = getErrorMessage;

  submitForm = (event: SubmitEvent) => {
    event.preventDefault();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { userName, password } = this.loginForm.getRawValue();

    this.authService.login({ userName, password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.submitErrorMessage.set(null);
      },
      error: (response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.submitErrorMessage.set('Invalid login or password');
        } else {
          this.submitErrorMessage.set('Unknown error occurred. Please try again later');
        }
      },
    });
  };
}
