import { createAction, props } from '@ngrx/store';

import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';
import { SeasonsEntity } from '../seasons/seasons.models';
import { RacesEntity } from './races.models';

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
