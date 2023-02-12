import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, withLatestFrom } from 'rxjs';

import * as RacesActions from './races.actions';
import * as RacesFeature from './races.reducer';
import { RacesService } from './races.service';
import { SeasonsFacade } from '../seasons/seasons.facade';

@Injectable()
export class RacesEffects {
  private actions$ = inject(Actions);
  private racesService$ = inject(RacesService);
  private seasonFacade$ = inject(SeasonsFacade);

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

  loadFinalResultsByRaceAndSelectedSeason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RacesActions.loadFinalResultsByRaceAndSelectedSeason),
      withLatestFrom(this.seasonFacade$.selectedSeason$),
      switchMap(([{ raceId }, selectedSeason]) => {
        return selectedSeason
          ? this.racesService$.getFinalResultsByRace(selectedSeason.id, raceId)
          : [];
      }),
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

  loadRaceQualifyingResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RacesActions.loadQualifyingResultsByRaceAndSelectedSeason),
      withLatestFrom(this.seasonFacade$.selectedSeason$),
      switchMap(([{ raceId }, selectedSeason]) => {
        return selectedSeason
          ? this.racesService$.getQualifyingResultsByRace(
              selectedSeason.id,
              raceId
            )
          : [];
      }),
      switchMap(({ results }) =>
        of(
          RacesActions.loadRaceQualifyingResultsSuccess({
            raceQualifyingResults: results,
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(RacesActions.loadRaceQualifyingResultsFailure({ error }));
      })
    )
  );

  loadDriverStandingsByRaceAndSelectedSeason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RacesActions.loadDriverStandingsByRaceAndSelectedSeason),
      withLatestFrom(this.seasonFacade$.selectedSeason$),
      switchMap(([{ raceId }, selectedSeason]) => {
        return selectedSeason
          ? this.racesService$.getDriverStandingsByRace(
              selectedSeason.id,
              raceId
            )
          : [];
      }),
      switchMap(({ results }) =>
        of(
          RacesActions.loadRaceDriverStandingsSuccess({
            raceDriverStandings: results,
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(RacesActions.loadRaceDriverStandingsFailure({ error }));
      })
    )
  );
}
