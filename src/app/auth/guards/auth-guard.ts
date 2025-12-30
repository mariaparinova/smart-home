import { RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard = (requiresAuth: boolean) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuthenticated = authService.isAuthenticated();

    if (requiresAuth && !isAuthenticated) {
      return new RedirectCommand(router.createUrlTree(['/login']), { replaceUrl: true });
    }

    if (!requiresAuth && isAuthenticated) {
      return new RedirectCommand(router.createUrlTree(['/dashboard']), { replaceUrl: true });
    }

    return true;
  };
};
