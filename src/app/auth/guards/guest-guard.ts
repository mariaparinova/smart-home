import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return new RedirectCommand(router.createUrlTree(['/dashboard']), { replaceUrl: true });
  }

  return true;
};
