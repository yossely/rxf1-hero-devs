import { createAction, props } from '@ngrx/store';
import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';
import { DriversEntity } from './drivers.models';

export const initDrivers = createAction(
  '[Drivers Page] Init',
  props<{ seasonId: string; pagination?: ErgastF1APIPaginationQueryParams }>()
);

export const loadDriversSuccess = createAction(
  '[Drivers/API] Load Drivers Success',
  props<{ drivers: DriversEntity[]; total: number }>()
);

export const loadDriversFailure = createAction(
  '[Drivers/API] Load Drivers Failure',
  props<{ error: any }>()
);
