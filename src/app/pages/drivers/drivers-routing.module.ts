import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DriversPageComponent } from './drivers-page/drivers-page.component';

const routes: Routes = [{ path: '', component: DriversPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule {}
