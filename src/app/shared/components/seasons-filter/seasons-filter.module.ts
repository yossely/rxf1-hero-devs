import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

import { SeasonsFilterComponent } from './seasons-filter.component';

@NgModule({
  declarations: [SeasonsFilterComponent],
  imports: [CommonModule, MatSelectModule],
  exports: [SeasonsFilterComponent],
  providers: [],
})
export class SeasonsFilterModule {}
