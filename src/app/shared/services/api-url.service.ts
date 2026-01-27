import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, retry, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  private http = inject(HttpClient);
  private apiBaseUrl: string | undefined;

  init(): Observable<void> {
    const remoteUrl = environment.remoteSmartHomeApiBaseUrl;
    const localUrl = environment.localSmartHomeApiBaseUrl;

    if (!remoteUrl) {
      this.apiBaseUrl = localUrl;
      return of(undefined);
    }

    return this.http.get(remoteUrl, { responseType: 'text' }).pipe(
      retry({
        count: 2,
        delay: 2000,
      }),
      tap(() => {
        this.apiBaseUrl = remoteUrl;
      }),
      map(() => undefined),
      catchError(() => {
        this.apiBaseUrl = localUrl;
        confirm(
          'Remote Smart Home API is not available. \n You need to run local backend server - check instruction here: \n https://github.com/mariaparinova/smart-home/blob/dev/README.md#backend-setup',
        );

        return of(undefined);
      }),
    );
  }

  getApiBaseUrl(): string {
    return this.apiBaseUrl || environment.localSmartHomeApiBaseUrl;
  }
}
