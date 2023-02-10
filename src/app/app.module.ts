import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarModule } from './navbar/navbar.module';
import { DriversPageComponent } from './pages/drivers/drivers-page/drivers-page.component';
import { DriversModule } from './pages/drivers/drivers.module';
import { SeasonsStateModule } from './+state';
import { RacesPageComponent } from './pages/races/races-page/races-page.component';
import { RacesModule } from './pages/races/races.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    NavbarModule,
    DriversModule,
    SeasonsStateModule,
    RacesModule,
    RouterModule.forRoot([
      {
        path: 'drivers',
        component: DriversPageComponent,
      },
      {
        path: 'races',
        component: RacesPageComponent,
      },
      {
        path: '**',
        component: HomeComponent,
      },
    ]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
