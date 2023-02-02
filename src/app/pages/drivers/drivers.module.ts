import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { DriversPageComponent } from './drivers-page/drivers-page.component';
import { DriversStateModule } from 'src/app/+state';
import { DriversListComponent } from './drivers-list/drivers-list.component';

@NgModule({
  declarations: [DriversPageComponent, DriversListComponent],
  imports: [CommonModule, DriversStateModule, MatTableModule],
  exports: [DriversPageComponent, DriversListComponent],
})
export class DriversModule { }
