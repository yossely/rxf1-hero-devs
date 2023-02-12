import { Component, OnDestroy } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';

@Component({
  selector: 'rxf1-hero-devs-race-driver-standings-list',
  templateUrl: './race-driver-standings-list.component.html',
  styleUrls: ['./race-driver-standings-list.component.scss'],
})
export class RaceDriverStandingsListComponent implements OnDestroy {
  driverStandings$ = this.racesFacade.driverStandings$;
  selectedRace$ = this.racesFacade.selectedRace$;

  raceDriverStandingsListTableColumns: string[] = [
    'position',
    'driverName',
    'driverNationality',
    'points',
    'wins',
  ];

  private selectedRaceSub!: Subscription;

  constructor(private racesFacade: RacesFacade) {
    this.loadDriverStandings();
  }

  ngOnDestroy(): void {
    this.selectedRaceSub.unsubscribe();
  }

  private loadDriverStandings() {
    this.selectedRaceSub = this.selectedRace$
      .pipe(
        filter((selectedRace) => !!selectedRace && !!selectedRace.id),
        map((selectedRace) => selectedRace as RacesEntity)
      )
      .subscribe((selectedRace) => {
        this.racesFacade.loadDriverStandingsByRaceAndSelectedSeason(
          selectedRace.id
        );
      });
  }
}
