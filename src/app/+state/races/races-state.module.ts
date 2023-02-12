import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromRaces from './races.reducer';
import { RacesEffects } from './races.effects';
import { RacesFacade } from './races.facade';
import { RacesService } from './races.service';
import { SeasonsStateModule } from '../seasons/seasons-state.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeasonsStateModule,
    StoreModule.forFeature(fromRaces.RACES_FEATURE_KEY, fromRaces.racesReducer),
    EffectsModule.forFeature([RacesEffects]),
  ],
  providers: [RacesFacade, RacesService],
})
export class RacesStateModule {}
