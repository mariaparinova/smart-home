import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  private http = inject(HttpClient);
  private apiBaseUrl: string | undefined;
  private localBackendInstruction = `
  Remote Smart Home API is not available.
  You need to run local backend server - check instruction here:
  https://github.com/mariaparinova/smart-home/blob/dev/README.md#backend-setup
  `;

  init(): Observable<void> {
    const remoteUrl = environment.remoteSmartHomeApiBaseUrl;
    const localUrl = environment.localSmartHomeApiBaseUrl;

    if (!remoteUrl) {
      this.apiBaseUrl = localUrl;
      return of(undefined);
    }

    return this.http.get(remoteUrl).pipe(
      map(() => {
        this.apiBaseUrl = remoteUrl;
      }),
      catchError(() => {
        this.apiBaseUrl = localUrl;
        confirm(this.localBackendInstruction);
        return of(undefined);
      })
    );
  }

  getApiBaseUrl(): string {
    return this.apiBaseUrl || environment.localSmartHomeApiBaseUrl;
  }
}
