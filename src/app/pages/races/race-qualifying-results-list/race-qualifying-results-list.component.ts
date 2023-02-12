import { Component, OnDestroy } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';

@Component({
  selector: 'rxf1-hero-devs-race-qualifying-results-list',
  templateUrl: './race-qualifying-results-list.component.html',
  styleUrls: ['./race-qualifying-results-list.component.scss'],
})
export class RaceQualifyingResultsListComponent implements OnDestroy {
  raceQualifyingResults$ = this.racesFacade.raceQualifyingResults$;
  selectedRace$ = this.racesFacade.selectedRace$;

  raceQualifyingResultsListTableColumns: string[] = [
    'position',
    'number',
    'driverName',
    'driverNationality',
    'q1',
    'q2',
    'q3',
  ];

  private selectedRaceSub!: Subscription;

  constructor(private racesFacade: RacesFacade) {
    this.loadQualifyingResultsByRace();
  }

  ngOnDestroy(): void {
    this.selectedRaceSub.unsubscribe();
  }

  private loadQualifyingResultsByRace() {
    this.selectedRaceSub = this.selectedRace$
      .pipe(
        filter((selectedRace) => !!selectedRace && !!selectedRace.id),
        map((selectedRace) => selectedRace as RacesEntity)
      )
      .subscribe((selectedRace) => {
        this.racesFacade.loadQualifyingResultsByRaceAndSelectedSeason(
          selectedRace.id
        );
      });
  }
}
