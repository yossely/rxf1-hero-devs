import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';

import * as DriversActions from './drivers.actions';
import * as DriversFeature from './drivers.reducer';

import { DriversService } from './drivers.service';

@Injectable()
export class DriversEffects {
  private actions$ = inject(Actions);
  private driversService$ = inject(DriversService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActions.initDrivers),
      switchMap(({ seasonId, pagination }) =>
        this.driversService$.getDriversListBySeason(seasonId, pagination)
      ),
      switchMap(({ drivers, total }) => {
        return of(DriversActions.loadDriversSuccess({ drivers, total }));
      }),
      catchError((error) => {
        // TODO: handle errors
        console.error('Error', error);
        return of(DriversActions.loadDriversFailure({ error }));
      })
    )
  );
}
