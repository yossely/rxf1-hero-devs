import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter, map, Subscription } from 'rxjs';

import { RacesFacade } from 'src/app/+state/races/races.facade';
import { RacesEntity } from 'src/app/+state/races/races.models';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';

@Component({
  selector: 'rxf1-hero-devs-races-list',
  templateUrl: './races-list.component.html',
  styleUrls: ['./races-list.component.scss'],
})
export class RacesListComponent implements OnDestroy {
  racesList$ = this.racesFacade.allRaces$;
  totalItems$ = this.racesFacade.totalRaces$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;

  currentSelectedSeason!: SeasonsEntity;

  driversListTableColumns: string[] = [
    'raceId',
    'raceName',
    'raceUrl',
    'selectRace',
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;

  private selectedSeasonSub!: Subscription;

  constructor(
    private racesFacade: RacesFacade,
    private seasonsFacade: SeasonsFacade
  ) {
    this.loadRacesBySeason();
  }

  ngOnDestroy(): void {
    this.selectedSeasonSub.unsubscribe();
  }

  onPageChange(pageEvent: PageEvent) {
    this.racesFacade.init(this.currentSelectedSeason.id, {
      limit: pageEvent.pageSize,
      offset: pageEvent.pageSize * pageEvent.pageIndex,
    });
  }

  markRaceAsSelected(race: RacesEntity) {
    // TODO: mark row as selected in table (highlight)
    this.racesFacade.selectRace(race.id);
  }

  private loadRacesBySeason() {
    this.selectedSeasonSub = this.selectedSeason$
      .pipe(
        filter((selectedSeason) => !!selectedSeason && !!selectedSeason.id),
        map((selectedSeason) => selectedSeason as SeasonsEntity)
      )
      .subscribe((selectedSeason) => {
        this.racesFacade.init(selectedSeason.id);
        this.currentSelectedSeason = selectedSeason;

        if (this.paginator) {
          this.paginator.firstPage();
        }
      });
  }
}
