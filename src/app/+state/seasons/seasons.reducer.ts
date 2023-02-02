import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SeasonsActions from './seasons.actions';
import { SeasonsEntity } from './seasons.models';

export const SEASONS_FEATURE_KEY = 'seasons';

export interface SeasonsState extends EntityState<SeasonsEntity> {
  selectedId?: string | number; // which Seasons record has been selected
  loaded: boolean; // has the Seasons list been loaded
  error?: string | null; // last known error (if any)
}

export interface SeasonsPartialState {
  readonly [SEASONS_FEATURE_KEY]: SeasonsState;
}

export const seasonsAdapter: EntityAdapter<SeasonsEntity> =
  createEntityAdapter<SeasonsEntity>();

export const initialSeasonsState: SeasonsState = seasonsAdapter.getInitialState(
  {
    loaded: false,
  }
);

const reducer = createReducer(
  initialSeasonsState,
  on(SeasonsActions.initSeasons, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SeasonsActions.loadSeasonsSuccess, (state, { seasons }) =>
    seasonsAdapter.setAll(seasons, { ...state, loaded: true, selectedId: seasons[0].id })
  ),
  on(SeasonsActions.loadSeasonsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SeasonsActions.selectSeason, (state, { seasonId }) => ({
    ...state,
    selectedId: seasonId,
  }))
);

export function seasonsReducer(
  state: SeasonsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
