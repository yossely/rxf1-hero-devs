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
import { PageExampleComponent } from './pages/page-example/page-example.component';
import { NavbarModule } from './navbar/navbar.module';
import { DriversPageComponent } from './pages/drivers/drivers-page/drivers-page.component';
import { DriversModule } from './pages/drivers/drivers.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    NavbarModule,
    DriversModule,
    RouterModule.forRoot([
      {
        path: 'drivers',
        component: DriversPageComponent,
      },
      {
        path: 'page-example',
        component: PageExampleComponent,
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
export class AppModule { }
