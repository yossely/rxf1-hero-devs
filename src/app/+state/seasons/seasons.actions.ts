import { createAction, props } from '@ngrx/store';
import { SeasonsEntity } from './seasons.models';

export const initSeasons = createAction('[Seasons Page] Init');

export const loadSeasonsSuccess = createAction(
  '[Seasons/API] Load Seasons Success',
  props<{ seasons: SeasonsEntity[] }>()
);

export const loadSeasonsFailure = createAction(
  '[Seasons/API] Load Seasons Failure',
  props<{ error: any }>()
);

export const selectSeason = createAction(
  '[Seasons Page] Select Season',
  props<{ seasonId: SeasonsEntity['id'] }>()
);
