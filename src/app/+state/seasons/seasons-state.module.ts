import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSeasons from './seasons.reducer';
import { SeasonsEffects } from './seasons.effects';
import { SeasonsFacade } from './seasons.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSeasons.SEASONS_FEATURE_KEY,
      fromSeasons.seasonsReducer
    ),
    EffectsModule.forFeature([SeasonsEffects]),
  ],
  providers: [SeasonsFacade],
})
export class SeasonsStateModule {}
