import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap } from 'rxjs';

import { ScoutApiService } from '../services/scout-api';
import { ScoutApiSignature, ScoutCandidate } from '../models/scout-api-response.model';

interface ScoutState {
  candidates: ScoutCandidate[];
  count: number;
  signature: ScoutApiSignature | null;
  loading: boolean;
  error: string | null;
}

const initialState: ScoutState = {
  candidates: [],
  count: 0,
  signature: null,
  loading: false,
  error: null,
};

export const ScoutStore = signalStore(
  withState(initialState),

  withComputed(({ candidates, count }) => ({
    hasCandidates: computed(() => candidates().length > 0),
    candidateCount: computed(() => count()),
  })),

  withMethods((store, scoutApi = inject(ScoutApiService)) => ({
    loadScoutData: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, {
            loading: true,
            error: null,
          });
        }),
        switchMap(() =>
          scoutApi.getScoutData().pipe(
            tap({
              next: (response) => {
                patchState(store, {
                  candidates: response.data,
                  count: Number(response.count),
                  signature: response.signature,
                  loading: false,
                  error: null,
                });
              },
            }),
            tap({
              error: (error: unknown) => {
                console.error('Unable to load Scout data:', error);

                patchState(store, {
                  loading: false,
                  error: 'Unable to load NASA Scout data. Please try again.',
                });
              },
            }),
          ),
        ),
      ),
    ),
  })),
);
