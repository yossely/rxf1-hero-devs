import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as DriversActions from './drivers.actions';
import * as DriversSelectors from './drivers.selectors';

@Injectable()
export class DriversFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(DriversSelectors.selectDriversLoaded));
  allDrivers$ = this.store.pipe(select(DriversSelectors.selectAllDrivers));
  selectedDrivers$ = this.store.pipe(select(DriversSelectors.selectEntity));

  init(seasonId: string) {
    this.store.dispatch(DriversActions.initDrivers({seasonId}));
  }
}
