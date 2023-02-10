import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { combineLatest, filter, map } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';
import { RacesListComponent } from '../races-list/races-list.component';

@Component({
  selector: 'rxf1-hero-devs-races-page',
  templateUrl: './races-page.component.html',
  styleUrls: ['./races-page.component.scss'],
})
export class RacesPageComponent implements AfterViewInit {
  selectedSeason$ = this.seasonsFacade.selectedSeason$;
  raceFinalResults$ = this.racesFacade.raceFinalResults$;
  selectedRace$ = this.racesFacade.selectedRace$;

  @ViewChild(RacesListComponent, { static: true })
  racesListComponent!: RacesListComponent;

  constructor(
    private racesFacade: RacesFacade,
    private seasonsFacade: SeasonsFacade
  ) {}

  ngAfterViewInit(): void {
    this.loadFinalResultsByRace();
  }

  markRaceAsSelect(race: RacesEntity) {
    this.racesFacade.selectRace(race.id);
  }

  private loadFinalResultsByRace() {
    combineLatest([
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
    // ? unsubscribe on destroy
  }
}
