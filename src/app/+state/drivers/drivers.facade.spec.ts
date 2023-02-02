import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';
import { of } from 'rxjs';

import * as DriversActions from './drivers.actions';
import { DriversEffects } from './drivers.effects';
import { DriversFacade } from './drivers.facade';
import { DriversEntity } from './drivers.models';
import {
  DRIVERS_FEATURE_KEY,
  DriversState,
  initialDriversState,
  driversReducer,
} from './drivers.reducer';
import * as DriversSelectors from './drivers.selectors';
import { DriversService } from './drivers.service';

interface TestSchema {
  drivers: DriversState;
}

const mockDriversService = {
  getDriversListBySeason: (season: string) => of([]),
}

describe('DriversFacade', () => {
  let facade: DriversFacade;
  let store: Store<TestSchema>;
  const createDriversEntity = (id: string, name = ''): DriversEntity => ({
    id,
    permanentNumber: `perm-number-${id}`,
    code: `code-${id}`,
    url: `url-${id}`,
    givenName: name || `name-${id}`,
    familyName: `family-name-${id}`,
    dateOfBirth: new Date().toISOString(),
    nationality: 'Thai',
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DRIVERS_FEATURE_KEY, driversReducer),
          EffectsModule.forFeature([DriversEffects]),
        ],
        providers: [DriversFacade, { provide: DriversService, useValue: mockDriversService }],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(DriversFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDrivers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDrivers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDriversSuccess` to manually update list
     */
    it('allDrivers$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDrivers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DriversActions.loadDriversSuccess({
          drivers: [createDriversEntity('AAA'), createDriversEntity('BBB')],
        })
      );

      list = await readFirst(facade.allDrivers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
