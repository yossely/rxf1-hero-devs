import { DriversEntity } from './drivers.models';
import {
  driversAdapter,
  DriversPartialState,
  initialDriversState,
} from './drivers.reducer';
import * as DriversSelectors from './drivers.selectors';

describe('Drivers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDriversId = (it: DriversEntity) => it.id;
  const createDriversEntity = (id: string, name = '') =>
    ({
      id,
      permanentNumber: `perm-number-${id}`,
      code: `code-${id}`,
      url: `url-${id}`,
      givenName: name || `name-${id}`,
      familyName: `family-name-${id}`,
      dateOfBirth: new Date().toISOString(),
      nationality: 'Thai',
    } as DriversEntity);

  let state: DriversPartialState;

  beforeEach(() => {
    state = {
      drivers: driversAdapter.setAll(
        [
          createDriversEntity('PRODUCT-AAA'),
          createDriversEntity('PRODUCT-BBB'),
          createDriversEntity('PRODUCT-CCC'),
        ],
        {
          ...initialDriversState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Drivers Selectors', () => {
    it('selectAllDrivers() should return the list of Drivers', () => {
      const results = DriversSelectors.selectAllDrivers(state);
      const selId = getDriversId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = DriversSelectors.selectEntity(state) as DriversEntity;
      const selId = getDriversId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectDriversLoaded() should return the current "loaded" status', () => {
      const result = DriversSelectors.selectDriversLoaded(state);

      expect(result).toBe(true);
    });

    it('selectDriversError() should return the current "error" state', () => {
      const result = DriversSelectors.selectDriversError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
