import { TestBed } from '@angular/core/testing';
import { RedirectCommand, Router } from '@angular/router';

import { authGuard } from './auth-guard';
import { AuthService } from '../services/auth.service';

describe('isAuthGuard', () => {
  const executeGuard = (requiresAuth: boolean): RedirectCommand | boolean =>
    TestBed.runInInjectionContext(() => authGuard(requiresAuth)());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: Router, useValue: { createUrlTree: () => ({}) } },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
