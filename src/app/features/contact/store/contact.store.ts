import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, catchError, of, pipe, switchMap, tap, throwError, timer } from 'rxjs';

type SubmissionStatus = 'idle' | 'success' | 'error';

interface ContactState {
  isSubmitting: boolean;
  submissionStatus: SubmissionStatus;
}

const initialState: ContactState = {
  isSubmitting: false,
  submissionStatus: 'idle',
};

export const ContactStore = signalStore(
  withState(initialState),

  withMethods((store) => ({
    submitMessage: rxMethod<boolean>(
      pipe(
        tap(() => {
          patchState(store, {
            isSubmitting: true,
            submissionStatus: 'idle',
          });
        }),

        switchMap((isOnline) =>
          timer(1000).pipe(
            switchMap(() =>
              isOnline ? of(true) : throwError(() => new Error('Network connection unavailable.')),
            ),

            tap(() => {
              patchState(store, {
                isSubmitting: false,
                submissionStatus: 'success',
              });
            }),

            switchMap(() =>
              timer(4000).pipe(
                tap(() => {
                  patchState(store, {
                    submissionStatus: 'idle',
                  });
                }),
              ),
            ),

            catchError((error: unknown) => {
              console.error('Contact form submission failed:', error);

              patchState(store, {
                isSubmitting: false,
                submissionStatus: 'error',
              });

              return EMPTY;
            }),
          ),
        ),
      ),
    ),
  })),
);
