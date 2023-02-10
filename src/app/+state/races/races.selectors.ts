import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RACES_FEATURE_KEY, RacesState, racesAdapter } from './races.reducer';

// Lookup the 'Races' feature state managed by NgRx
export const selectRacesState =
  createFeatureSelector<RacesState>(RACES_FEATURE_KEY);

const { selectAll, selectEntities } = racesAdapter.getSelectors();

export const selectRacesLoaded = createSelector(
  selectRacesState,
  (state: RacesState) => state.loaded
);

export const selectRacesError = createSelector(
  selectRacesState,
  (state: RacesState) => state.error
);

export const selectAllRaces = createSelector(
  selectRacesState,
  (state: RacesState) => selectAll(state)
);

export const selectRacesEntities = createSelector(
  selectRacesState,
  (state: RacesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectRacesState,
  (state: RacesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectRacesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectTotalRaces = createSelector(
  selectRacesState,
  (state: RacesState) => state.total
);

export const selectRaceFinalResults = createSelector(
  selectRacesState,
  (state: RacesState) => state.finalResults
);

export const selectRaceQualifyingResults = createSelector(
  selectRacesState,
  (state: RacesState) => state.qualifyingResults
);
