import { Component } from '@angular/core';

import { SeasonsFacade } from './+state/seasons/seasons.facade';

@Component({
  selector: 'rxf1-hero-devs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rxf1-hero-devs';

  constructor(private seasonsFacade: SeasonsFacade) {
    // * Load seasons in the application root component as they're used across all pages
    this.seasonsFacade.init();
  }
}
