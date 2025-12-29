import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatError, MatInput, MatButton],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  protected formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginFormSubmitErrorMessage = signal<string | null>(null);

  formErrorMessages = {
    userName: {
      required: 'This field is required',
      minlength: 'Must contain at least 2 letters',
      pattern: 'Allowed characters is A-Z a-z',
    },
    password: {
      required: 'This field is required',
      minlength: 'Minimum length is 2 symbols',
    },
  };

  loginForm = this.formBuilder.nonNullable.group({
    userName: [
      'Sparks',
      [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]{2,}$/)],
    ],
    password: ['consectetur', [Validators.required, Validators.minLength(2)]],
  });

  getErrorMessage(
    control: AbstractControl,
    messages: Record<string, string>
  ): string | null {
    if (!control.errors) {
      return null;
    }

    const errorKeys = Object.keys(control.errors);

    for (const key of errorKeys) {
      if (messages[key]) {
        return messages[key];
      }
    }
    return null;
  }

  submitLoginForm = () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { userName, password } = this.loginForm.getRawValue();

    this.authService.login({ userName, password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.loginFormSubmitErrorMessage.set('Invalid login or password');
        } else {
          this.loginFormSubmitErrorMessage.set('Unknown error occurred. Please try again later');
        }
      },
    });
  };
}
