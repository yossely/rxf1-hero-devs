import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DriversPageComponent } from './drivers-page/drivers-page.component';
import { DriversStateModule } from 'src/app/+state';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { SeasonsFilterModule } from 'src/app/shared/components/seasons-filter/seasons-filter.module';

@NgModule({
  declarations: [DriversPageComponent, DriversListComponent],
  imports: [
    CommonModule,
    DriversStateModule,
    SeasonsFilterModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [DriversPageComponent, DriversListComponent],
})
export class DriversModule {}
