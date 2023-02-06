import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RacesPageComponent } from './races-page/races-page.component';
import { SeasonsFilterModule } from 'src/app/shared/components/seasons-filter/seasons-filter.module';
import { RacesListComponent } from './races-list/races-list.component';
import { RacesStateModule } from 'src/app/+state';

@NgModule({
  declarations: [RacesPageComponent, RacesListComponent],
  imports: [
    CommonModule,
    SeasonsFilterModule,
    MatTableModule,
    MatPaginatorModule,
    RacesStateModule,
  ],
  exports: [RacesPageComponent, RacesListComponent],
})
export class RacesModule {}
