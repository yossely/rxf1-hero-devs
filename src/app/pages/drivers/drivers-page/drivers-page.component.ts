import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { combineLatest, filter, map, startWith } from 'rxjs';

import { DriversFacade } from 'src/app/+state/drivers/drivers.facade';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';
import { DriversListComponent } from '../drivers-list/drivers-list.component';

@Component({
  selector: 'rxf1-hero-devs-drivers-page',
  templateUrl: './drivers-page.component.html',
  styleUrls: ['./drivers-page.component.scss'],
})
export class DriversPageComponent implements AfterViewInit {
  allDrivers$ = this.driversFacade.allDrivers$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;
  totalDrivers$ = this.driversFacade.totalDrivers$;

  @ViewChild(DriversListComponent, { static: true })
  driversListComponent!: DriversListComponent;

  constructor(
    private driversFacade: DriversFacade,
    private seasonsFacade: SeasonsFacade
  ) {}

  ngAfterViewInit(): void {
    // TODO: reset pagination on selected season change
    combineLatest([
      this.selectedSeason$.pipe(
        filter((selectedSeason) => !!selectedSeason && !!selectedSeason.id),
        map((selectedSeason) => selectedSeason as SeasonsEntity)
      ),
      this.driversListComponent.paginationChange.pipe(startWith(undefined)),
    ]).subscribe(([selectedSeason, pagination]) => {
      this.driversFacade.init(String(selectedSeason.id), pagination);
    });
    // ? unsubscribe on destroy
  }
}
