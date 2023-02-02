import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';


import * as fromDrivers from './drivers.reducer';
import { DriversEffects } from './drivers.effects';
import { DriversFacade } from './drivers.facade';
import { DriversService } from './drivers.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromDrivers.DRIVERS_FEATURE_KEY,
      fromDrivers.driversReducer
    ),
    EffectsModule.forFeature([DriversEffects]),
  ],
  providers: [DriversFacade, DriversService],
})
export class DriversStateModule { }
