import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SEASONS_FEATURE_KEY,
  SeasonsState,
  seasonsAdapter,
} from './seasons.reducer';

// Lookup the 'Seasons' feature state managed by NgRx
export const selectSeasonsState =
  createFeatureSelector<SeasonsState>(SEASONS_FEATURE_KEY);

const { selectAll, selectEntities } = seasonsAdapter.getSelectors();

export const selectSeasonsLoaded = createSelector(
  selectSeasonsState,
  (state: SeasonsState) => state.loaded
);

export const selectSeasonsError = createSelector(
  selectSeasonsState,
  (state: SeasonsState) => state.error
);

export const selectAllSeasons = createSelector(
  selectSeasonsState,
  (state: SeasonsState) => selectAll(state)
);

export const selectSeasonsEntities = createSelector(
  selectSeasonsState,
  (state: SeasonsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectSeasonsState,
  (state: SeasonsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectSeasonsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
