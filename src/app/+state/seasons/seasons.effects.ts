import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as SeasonsActions from './seasons.actions';
import * as SeasonsFeature from './seasons.reducer';

import { switchMap, catchError, of } from 'rxjs';

@Injectable()
export class SeasonsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeasonsActions.initSeasons),
      // TODO: API request to get all the seasons and filter the required ones
      switchMap(() => of(SeasonsActions.loadSeasonsSuccess({ 
        seasons: [
          {id: '2018'}, 
          {id: '2019'}, 
          {id: '2020'},
          {id: '2021'},
          {id: '2022'},
        ] 
      }))),
      catchError((error) => {
        console.error('Error', error);
        return of(SeasonsActions.loadSeasonsFailure({ error }));
      })
    )
  );
}
