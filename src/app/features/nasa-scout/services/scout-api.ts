import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

import { ScoutApiResponse } from '../models/scout-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ScoutApiService {
  private readonly http = inject(HttpClient);

  private readonly liveApiUrl = '/api/scout';
  private readonly mockApiUrl = 'assets/mock-data/scout-response.json';

  getScoutData(): Observable<ScoutApiResponse> {
    return this.http.get<ScoutApiResponse>(this.liveApiUrl).pipe(
      tap((response) => {
        console.info('Scout data loaded successfully from live API.');
      }),
      catchError((error: unknown) => {
        console.error('Live API request failed. Loading mock data.', error);

        return this.http.get<ScoutApiResponse>(this.mockApiUrl).pipe(
          tap(() => {
            console.info('Scout data loaded successfully from mock JSON.');
          }),
        );
      }),
    );
  }
}
