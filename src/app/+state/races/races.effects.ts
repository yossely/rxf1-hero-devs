import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';

import * as RacesActions from './races.actions';
import * as RacesFeature from './races.reducer';
import { RacesService } from './races.service';

@Injectable()
export class RacesEffects {
  private actions$ = inject(Actions);
  private racesService$ = inject(RacesService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RacesActions.initRaces),
      switchMap(({ seasonId, pagination }) =>
        this.racesService$.getRacesListBySeason(seasonId, pagination)
      ),
      switchMap(({ races, total }) =>
        of(RacesActions.loadRacesSuccess({ races, total }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(RacesActions.loadRacesFailure({ error }));
      })
    )
  );

  loadRaceFinalResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RacesActions.loadFinalResultsByRace),
      switchMap(({ seasonId, raceId }) =>
        this.racesService$.getFinalResultsByRace(seasonId, raceId)
      ),
      switchMap(({ results }) =>
        of(
          RacesActions.loadRaceFinalResultsSuccess({
            raceFinalResults: results,
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(RacesActions.loadRaceFinalResultsFailure({ error }));
      })
    )
  );
}
