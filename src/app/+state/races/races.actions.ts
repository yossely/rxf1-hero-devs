import { createAction, props } from '@ngrx/store';

import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';
import { SeasonsEntity } from '../seasons/seasons.models';
import { RacesEntity, RacesFinalResult } from './races.models';

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

export const loadFinalResultsByRace = createAction(
  '[Races Page] Load race final results',
  props<{
    seasonId: SeasonsEntity['id'];
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
