import { OnDestroy, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter, map, Subscription } from 'rxjs';

import { DriversFacade } from 'src/app/+state/drivers/drivers.facade';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';

@Component({
  selector: 'rxf1-hero-devs-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent implements OnDestroy {
  driversList$ = this.driversFacade.allDrivers$;
  totalItems$ = this.driversFacade.totalDrivers$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;

  currentSelectedSeason!: SeasonsEntity;

  driversListTableColumns: string[] = [
    'permanentNumber',
    'givenName',
    'familyName',
    'nationality',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private selectedSeasonSub!: Subscription;

  constructor(
    private driversFacade: DriversFacade,
    private seasonsFacade: SeasonsFacade
  ) {
    this.loadDriversBySeason();
  }

  ngOnDestroy(): void {
    this.selectedSeasonSub.unsubscribe();
  }

  onPageChange(pageEvent: PageEvent) {
    this.driversFacade.init(this.currentSelectedSeason.id, {
      limit: pageEvent.pageSize,
      offset: pageEvent.pageSize * pageEvent.pageIndex,
    });
  }

  private loadDriversBySeason() {
    this.selectedSeasonSub = this.selectedSeason$
      .pipe(
        filter((selectedSeason) => !!selectedSeason && !!selectedSeason.id),
        map((selectedSeason) => selectedSeason as SeasonsEntity)
      )
      .subscribe((selectedSeason) => {
        this.driversFacade.init(selectedSeason.id);
        this.currentSelectedSeason = selectedSeason;

        if (this.paginator) {
          this.paginator.firstPage();
        }
      });
  }
}
