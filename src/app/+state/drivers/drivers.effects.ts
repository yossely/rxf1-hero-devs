import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as DriversActions from './drivers.actions';
import * as DriversFeature from './drivers.reducer';

import { switchMap, catchError, of } from 'rxjs';
import { DriversService } from './drivers.service';

@Injectable()
export class DriversEffects {
  private actions$ = inject(Actions);
  private driversService$ = inject(DriversService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActions.initDrivers),
      // TODO: season should be provided by param
      switchMap(() => this.driversService$.getDriversListBySeason('2019')),
      switchMap((drivers) => {
        return of(DriversActions.loadDriversSuccess({ drivers: drivers }))
      }),
      catchError((error) => {
        // TODO: handle errors
        console.error('Error', error);
        return of(DriversActions.loadDriversFailure({ error }));
      })
    )
  );
}
