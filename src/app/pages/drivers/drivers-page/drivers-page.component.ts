import { Component, OnDestroy } from '@angular/core';
import { filter, map, Subscription, tap } from 'rxjs';

import { DriversFacade } from 'src/app/+state/drivers/drivers.facade';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';

@Component({
  selector: 'rxf1-hero-devs-drivers-page',
  templateUrl: './drivers-page.component.html',
  styleUrls: ['./drivers-page.component.scss'],
})
export class DriversPageComponent implements OnDestroy {

  allDrivers$ = this.driversFacade.allDrivers$;
  selectedSeason$ = this.seasonsFacade.selectedSeason$;

  private selectedSeasonSub: Subscription;

  constructor(private driversFacade: DriversFacade, private seasonsFacade: SeasonsFacade) {
    this.selectedSeasonSub = this.selectedSeason$.pipe(
      filter((selectedSeason) => !!selectedSeason && !!selectedSeason.id),
      map(selectedSeason => selectedSeason as SeasonsEntity),
      tap((selectedSeason) => {
        console.log({selectedSeason})
        this.driversFacade.init(String(selectedSeason.id));
      })
    ).subscribe()
    
  }

  ngOnDestroy(): void {
    this.selectedSeasonSub.unsubscribe()
  }
}
