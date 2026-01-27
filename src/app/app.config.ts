import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptors/auth-interceptor';
import { AuthService } from './auth/services/auth.service';
import { ApiUrlService } from './shared/services/api-url.service';
import { concatMap } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),

    provideAppInitializer(() => {
      const authService = inject(AuthService);
      const apiUrlService = inject(ApiUrlService);
      return apiUrlService.init().pipe(
        concatMap(() => authService.init())
      );
    }),

    provideRouter(
      routes,
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withComponentInputBinding(),
    ),
  ],
};
