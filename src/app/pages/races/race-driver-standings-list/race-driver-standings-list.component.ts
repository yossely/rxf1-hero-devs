import { Component, OnDestroy } from '@angular/core';
import { combineLatest, filter, map, Subscription } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';

@Component({
  selector: 'rxf1-hero-devs-race-driver-standings-list',
  templateUrl: './race-driver-standings-list.component.html',
  styleUrls: ['./race-driver-standings-list.component.scss'],
})
export class RaceDriverStandingsListComponent implements OnDestroy {
  driverStandings$ = this.racesFacade.driverStandings$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;
  selectedRace$ = this.racesFacade.selectedRace$;

  raceDriverStandingsListTableColumns: string[] = [
    'position',
    'driverName',
    'driverNationality',
    'points',
    'wins',
  ];

  private selectedSeasonSub!: Subscription;

  constructor(
    private racesFacade: RacesFacade,
    private seasonsFacade: SeasonsFacade
  ) {
    this.loadDriverStandings();
  }

  ngOnDestroy(): void {
    this.selectedSeasonSub.unsubscribe();
  }

  private loadDriverStandings() {
    this.selectedSeasonSub = combineLatest([
      this.selectedSeason$.pipe(
        filter((selectedSeason) => !!selectedSeason && !!selectedSeason.id),
        map((selectedSeason) => selectedSeason as SeasonsEntity)
      ),
      this.selectedRace$.pipe(
        filter((selectedRace) => !!selectedRace && !!selectedRace.id),
        map((selectedRace) => selectedRace as RacesEntity)
      ),
    ]).subscribe(([selectedSeason, selectedRace]) => {
      this.racesFacade.loadDriverStandingsByRace(
        selectedSeason.id,
        selectedRace.id
      );
    });
  }
}
