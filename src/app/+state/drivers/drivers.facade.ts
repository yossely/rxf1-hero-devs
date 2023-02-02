import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import { DriversStateModule } from './drivers-state.module';
import * as DriversActions from './drivers.actions';
import * as DriversFeature from './drivers.reducer';
import * as DriversSelectors from './drivers.selectors';

@Injectable()
export class DriversFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DriversSelectors.selectDriversLoaded));
  allDrivers$ = this.store.pipe(select(DriversSelectors.selectAllDrivers));
  selectedDrivers$ = this.store.pipe(select(DriversSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DriversActions.initDrivers());
  }
}
