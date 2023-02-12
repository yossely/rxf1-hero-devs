import { Component, OnDestroy } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';

@Component({
  selector: 'rxf1-hero-devs-race-results-list',
  templateUrl: './race-results-list.component.html',
  styleUrls: ['./race-results-list.component.scss'],
})
export class RaceResultsListComponent implements OnDestroy {
  raceFinalResults$ = this.racesFacade.raceFinalResults$;
  selectedRace$ = this.racesFacade.selectedRace$;

  raceFinalResultsListTableColumns: string[] = [
    'position',
    'number',
    'points',
    'driverName',
    'driverNationality',
    'time',
  ];

  private selectedRaceSub!: Subscription;

  constructor(private racesFacade: RacesFacade) {
    this.loadFinalResultsByRaceAndSelectedSeason();
  }

  ngOnDestroy(): void {
    this.selectedRaceSub.unsubscribe();
  }

  private loadFinalResultsByRaceAndSelectedSeason() {
    this.selectedRaceSub = this.selectedRace$
      .pipe(
        filter((selectedRace) => !!selectedRace && !!selectedRace.id),
        map((selectedRace) => selectedRace as RacesEntity)
      )
      .subscribe((selectedRace) => {
        console.log({ selectedRace });
        this.racesFacade.loadFinalResultsByRaceAndSelectedSeason(
          selectedRace.id
        );
      });
  }
}
