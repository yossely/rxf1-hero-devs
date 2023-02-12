import { createAction, props } from '@ngrx/store';

import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';
import { SeasonsEntity } from '../seasons/seasons.models';
import {
  RacesDriversStanding,
  RacesEntity,
  RacesFinalResult,
  RacesQualifyingResult,
} from './races.models';

export const initRaces = createAction(
  '[Races Page] Init',
  props<{
    seasonId: SeasonsEntity['id'];
    pagination?: ErgastF1APIPaginationQueryParams;
  }>()
);

export const loadRacesSuccess = createAction(
  '[Races/API] Load Races Success',
  props<{ races: RacesEntity[]; total: number }>()
);

export const loadRacesFailure = createAction(
  '[Races/API] Load Races Failure',
  props<{ error: any }>()
);

export const selectRace = createAction(
  '[Races Page] Select Race',
  props<{ raceId: RacesEntity['id'] }>()
);

export const clearSelectedRace = createAction(
  '[Races Page] Clear Selected Race'
);

export const loadFinalResultsByRaceAndSelectedSeason = createAction(
  '[Races Page] Load race final results by selected season',
  props<{
    raceId: RacesEntity['id'];
  }>()
);

export const loadRaceFinalResultsSuccess = createAction(
  '[Races/API] Load Race Final Results Success',
  props<{ raceFinalResults: RacesFinalResult[] }>()
);

export const loadRaceFinalResultsFailure = createAction(
  '[Races/API] Load Race Final Results Failure',
  props<{ error: any }>()
);

export const loadQualifyingResultsByRaceAndSelectedSeason = createAction(
  '[Races Page] Load race qualifying results by selected season',
  props<{
    raceId: RacesEntity['id'];
  }>()
);

export const loadRaceQualifyingResultsSuccess = createAction(
  '[Races/API] Load Race Qualifying Results Success',
  props<{ raceQualifyingResults: RacesQualifyingResult[] }>()
);

export const loadRaceQualifyingResultsFailure = createAction(
  '[Races/API] Load Race Qualifying Results Failure',
  props<{ error: any }>()
);

export const loadDriverStandingsByRaceAndSelectedSeason = createAction(
  '[Races Page] Load race driver standing by selected season',
  props<{
    raceId: RacesEntity['id'];
  }>()
);

export const loadRaceDriverStandingsSuccess = createAction(
  '[Races/API] Load Race Driver Standings Success',
  props<{ raceDriverStandings: RacesDriversStanding[] }>()
);

export const loadRaceDriverStandingsFailure = createAction(
  '[Races/API] Load Race Driver Standings Failure',
  props<{ error: any }>()
);
