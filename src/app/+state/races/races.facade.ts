import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';
import { SeasonsEntity } from '../seasons/seasons.models';
import * as RacesActions from './races.actions';
import { RacesEntity } from './races.models';
import * as RacesFeature from './races.reducer';
import * as RacesSelectors from './races.selectors';

@Injectable()
export class RacesFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(RacesSelectors.selectRacesLoaded));
  allRaces$ = this.store.pipe(select(RacesSelectors.selectAllRaces));
  selectedRace$ = this.store.pipe(select(RacesSelectors.selectEntity));
  totalRaces$ = this.store.pipe(select(RacesSelectors.selectTotalRaces));
  raceFinalResults$ = this.store.pipe(
    select(RacesSelectors.selectRaceFinalResults)
  );
  raceQualifyingResults$ = this.store.pipe(
    select(RacesSelectors.selectRaceQualifyingResults)
  );
  driverStandings$ = this.store.pipe(
    select(RacesSelectors.selectRaceDriverStandings)
  );

  init(
    seasonId: SeasonsEntity['id'],
    pagination?: ErgastF1APIPaginationQueryParams
  ) {
    this.store.dispatch(RacesActions.initRaces({ seasonId, pagination }));
  }

  selectRace(raceId: RacesEntity['id']) {
    this.store.dispatch(RacesActions.selectRace({ raceId }));
  }

  clearSelectedRace() {
    this.store.dispatch(RacesActions.clearSelectedRace());
  }

  loadFinalResultsByRaceAndSelectedSeason(raceId: RacesEntity['id']) {
    this.store.dispatch(
      RacesActions.loadFinalResultsByRaceAndSelectedSeason({ raceId })
    );
  }

  loadQualifyingResultsByRaceAndSelectedSeason(raceId: RacesEntity['id']) {
    this.store.dispatch(
      RacesActions.loadQualifyingResultsByRaceAndSelectedSeason({ raceId })
    );
  }

  loadDriverStandingsByRace(
    seasonId: SeasonsEntity['id'],
    raceId: RacesEntity['id']
  ) {
    this.store.dispatch(
      RacesActions.loadDriverStandingsByRace({ seasonId, raceId })
    );
  }
}
