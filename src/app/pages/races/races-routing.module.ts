import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RacesPageComponent } from './races-page/races-page.component';

const routes: Routes = [{ path: '', component: RacesPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RacesRoutingModule {}
