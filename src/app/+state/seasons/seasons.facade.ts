import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as SeasonsActions from './seasons.actions';
import { SeasonsEntity } from './seasons.models';
import * as SeasonsFeature from './seasons.reducer';
import * as SeasonsSelectors from './seasons.selectors';

@Injectable()
export class SeasonsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(SeasonsSelectors.selectSeasonsLoaded));
  allSeasons$ = this.store.pipe(select(SeasonsSelectors.selectAllSeasons));
  selectedSeason$ = this.store.pipe(select(SeasonsSelectors.selectEntity));

  init() {
    this.store.dispatch(SeasonsActions.initSeasons());
  }

  selectSeason(seasonId: SeasonsEntity['id']) {
    this.store.dispatch(SeasonsActions.selectSeason({seasonId}));
  }
}
