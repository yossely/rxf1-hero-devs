import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as DriversActions from './drivers.actions';
import { DriversEntity } from './drivers.models';

export const DRIVERS_FEATURE_KEY = 'drivers';

export interface DriversState extends EntityState<DriversEntity> {
  selectedId?: string | number; // which Drivers record has been selected
  loaded: boolean; // has the Drivers list been loaded
  error?: string | null; // last known error (if any)
  total: number; // total amount of drivers
}

export interface DriversPartialState {
  readonly [DRIVERS_FEATURE_KEY]: DriversState;
}

export const driversAdapter: EntityAdapter<DriversEntity> =
  createEntityAdapter<DriversEntity>();

export const initialDriversState: DriversState = driversAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
    total: 0,
  }
);

const reducer = createReducer(
  initialDriversState,
  on(DriversActions.initDrivers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DriversActions.loadDriversSuccess, (state, { drivers, total }) =>
    driversAdapter.setAll(drivers, { ...state, total, loaded: true })
  ),
  on(DriversActions.loadDriversFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function driversReducer(
  state: DriversState | undefined,
  action: Action
) {
  return reducer(state, action);
}
