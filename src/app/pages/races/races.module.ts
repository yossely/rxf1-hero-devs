import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { RacesPageComponent } from './races-page/races-page.component';
import { SeasonsFilterModule } from 'src/app/shared/components/seasons-filter/seasons-filter.module';
import { RacesListComponent } from './races-list/races-list.component';
import { RacesStateModule } from 'src/app/+state';
import { RaceResultsListComponent } from './race-results-list/race-results-list.component';

@NgModule({
  declarations: [
    RacesPageComponent,
    RacesListComponent,
    RaceResultsListComponent,
  ],
  imports: [
    CommonModule,
    SeasonsFilterModule,
    MatTableModule,
    MatPaginatorModule,
    RacesStateModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
  ],
  exports: [RacesPageComponent, RacesListComponent, RaceResultsListComponent],
})
export class RacesModule {}
