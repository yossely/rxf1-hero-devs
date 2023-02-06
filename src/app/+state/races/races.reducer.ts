import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RacesActions from './races.actions';
import { RacesEntity } from './races.models';

export const RACES_FEATURE_KEY = 'races';

export interface RacesState extends EntityState<RacesEntity> {
  selectedId?: string | number; // which Races record has been selected
  loaded: boolean; // has the Races list been loaded
  error?: string | null; // last known error (if any)
  total: number; // total number of races
}

export interface RacesPartialState {
  readonly [RACES_FEATURE_KEY]: RacesState;
}

export const racesAdapter: EntityAdapter<RacesEntity> =
  createEntityAdapter<RacesEntity>();

export const initialRacesState: RacesState = racesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  total: 0,
});

const reducer = createReducer(
  initialRacesState,
  on(RacesActions.initRaces, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RacesActions.loadRacesSuccess, (state, { races, total }) =>
    racesAdapter.setAll(races, { ...state, total, loaded: true })
  ),
  on(RacesActions.loadRacesFailure, (state, { error }) => ({ ...state, error }))
);

export function racesReducer(state: RacesState | undefined, action: Action) {
  return reducer(state, action);
}
