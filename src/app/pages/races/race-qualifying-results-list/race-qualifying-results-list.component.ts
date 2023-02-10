import { Component, OnDestroy } from '@angular/core';
import { combineLatest, filter, map, Subscription } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';

@Component({
  selector: 'rxf1-hero-devs-race-qualifying-results-list',
  templateUrl: './race-qualifying-results-list.component.html',
  styleUrls: ['./race-qualifying-results-list.component.scss'],
})
export class RaceQualifyingResultsListComponent implements OnDestroy {
  raceQualifyingResults$ = this.racesFacade.raceQualifyingResults$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;
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

  private selectedSeasonSub!: Subscription;

  constructor(
    private racesFacade: RacesFacade,
    private seasonsFacade: SeasonsFacade
  ) {
    this.loadQualifyingResultsByRace();
  }

  ngOnDestroy(): void {
    this.selectedSeasonSub.unsubscribe();
  }

  private loadQualifyingResultsByRace() {
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
      this.racesFacade.loadQualifyingResultsByRace(
        selectedSeason.id,
        selectedRace.id
      );
    });
  }
}
