import { Component, OnDestroy } from '@angular/core';
import { combineLatest, filter, map, Subscription } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';

@Component({
  selector: 'rxf1-hero-devs-race-results-list',
  templateUrl: './race-results-list.component.html',
  styleUrls: ['./race-results-list.component.scss'],
})
export class RaceResultsListComponent implements OnDestroy {
  raceFinalResults$ = this.racesFacade.raceFinalResults$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;
  selectedRace$ = this.racesFacade.selectedRace$;

  raceFinalResultsListTableColumns: string[] = [
    'position',
    'number',
    'points',
    'driverName',
    'driverNationality',
    'time',
  ];

  private selectedSeasonSub!: Subscription;

  constructor(
    private racesFacade: RacesFacade,
    private seasonsFacade: SeasonsFacade
  ) {
    this.loadFinalResultsByRace();
  }

  ngOnDestroy(): void {
    this.selectedSeasonSub.unsubscribe();
  }

  private loadFinalResultsByRace() {
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
      this.racesFacade.loadFinalResultsByRace(
        selectedSeason.id,
        selectedRace.id
      );
    });
  }
}
