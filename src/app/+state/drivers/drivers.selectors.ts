import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DRIVERS_FEATURE_KEY,
  DriversState,
  driversAdapter,
} from './drivers.reducer';

// Lookup the 'Drivers' feature state managed by NgRx
export const selectDriversState =
  createFeatureSelector<DriversState>(DRIVERS_FEATURE_KEY);

const { selectAll, selectEntities } = driversAdapter.getSelectors();

export const selectDriversLoaded = createSelector(
  selectDriversState,
  (state: DriversState) => state.loaded
);

export const selectDriversError = createSelector(
  selectDriversState,
  (state: DriversState) => state.error
);

export const selectAllDrivers = createSelector(
  selectDriversState,
  (state: DriversState) => selectAll(state)
);

export const selectDriversEntities = createSelector(
  selectDriversState,
  (state: DriversState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectDriversState,
  (state: DriversState) => state.selectedId
);

export const selectEntity = createSelector(
  selectDriversEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
