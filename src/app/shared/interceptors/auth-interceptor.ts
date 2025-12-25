import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const token = authService.token();

  if (request.url.includes('/user/login')) {
    return next(request);
  }

  if (token) {
    const requestWithToken = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(requestWithToken);
  }

  return next(request).pipe(
    tap({
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          authService.logout();
        }
      },
    }),
  );
}
