import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { UserProfile } from '../../shared/models/user.models';
import { SmartHomeApiService } from '../../shared/services/smart-home-api.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private smartHomeApiService = inject(SmartHomeApiService);

  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly token = this._token.asReadonly();

  private _user = signal<UserProfile | null>(null);
  readonly user = this._user.asReadonly();

  readonly isAuthenticated = computed(() => this._user() !== null);

  init(): Observable<UserProfile | null> {
    if (this._token() === null) {
      return of(null);
    }

    return this.getUserProfile().pipe(catchError(() => of(null)));
  }

  login(userData: { userName: string; password: string }): Observable<UserProfile> {
    return this.smartHomeApiService.getToken(userData).pipe(
      tap((response) => this.setToken(response.token)),
      switchMap(() => this.getUserProfile()),
    );
  }

  logout(): void {
    this.setToken(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  private setToken(value: string | null): void {
    if (value) {
      localStorage.setItem(TOKEN_KEY, value);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }

    this._token.set(value);
  }

  private getUserProfile(): Observable<UserProfile> {
    return this.smartHomeApiService
      .getUser()
      .pipe(tap((userProfile) => this._user.set(userProfile)));
  }
}
