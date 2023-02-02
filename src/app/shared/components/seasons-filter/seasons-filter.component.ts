import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';

@Component({
  selector: 'rxf1-hero-devs-seasons-filter',
  templateUrl: './seasons-filter.component.html',
  styleUrls: ['./seasons-filter.component.scss'],
})
export class SeasonsFilterComponent {
  allSeasons$ = this.seasonsFacade.allSeasons$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;

  constructor(private seasonsFacade: SeasonsFacade) { }

  selectSeason(event: MatSelectChange) {
    this.seasonsFacade.selectSeason(event.value);
  }
}
