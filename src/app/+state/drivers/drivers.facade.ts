import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as DriversActions from './drivers.actions';
import * as DriversSelectors from './drivers.selectors';
import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';

@Injectable()
export class DriversFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(DriversSelectors.selectDriversLoaded));
  allDrivers$ = this.store.pipe(select(DriversSelectors.selectAllDrivers));
  selectedDrivers$ = this.store.pipe(select(DriversSelectors.selectEntity));
  totalDrivers$ = this.store.pipe(select(DriversSelectors.selectTotalDrivers));

  init(seasonId: string, pagination?: ErgastF1APIPaginationQueryParams) {
    this.store.dispatch(DriversActions.initDrivers({ seasonId, pagination }));
  }
}
