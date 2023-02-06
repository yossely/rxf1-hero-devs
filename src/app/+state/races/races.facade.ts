import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';
import { SeasonsEntity } from '../seasons/seasons.models';
import * as RacesActions from './races.actions';
import * as RacesFeature from './races.reducer';
import * as RacesSelectors from './races.selectors';

@Injectable()
export class RacesFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(RacesSelectors.selectRacesLoaded));
  allRaces$ = this.store.pipe(select(RacesSelectors.selectAllRaces));
  selectedRaces$ = this.store.pipe(select(RacesSelectors.selectEntity));
  totalRaces$ = this.store.pipe(select(RacesSelectors.selectTotalRaces));

  init(
    seasonId: SeasonsEntity['id'],
    pagination?: ErgastF1APIPaginationQueryParams
  ) {
    this.store.dispatch(RacesActions.initRaces({ seasonId, pagination }));
  }
}
