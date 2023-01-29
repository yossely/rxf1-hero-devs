import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriversPageComponent } from './drivers-page/drivers-page.component';

@NgModule({
  declarations: [DriversPageComponent],
  imports: [CommonModule],
  exports: [DriversPageComponent],
})
export class DriversModule { }
