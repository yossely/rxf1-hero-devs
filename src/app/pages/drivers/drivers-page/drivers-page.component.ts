import { Component } from '@angular/core';
import { DriversFacade } from 'src/app/+state/drivers/drivers.facade';

@Component({
  selector: 'rxf1-hero-devs-drivers-page',
  templateUrl: './drivers-page.component.html',
  styleUrls: ['./drivers-page.component.scss'],
})
export class DriversPageComponent {

  allDrivers$ = this.driversFacade.allDrivers$;

  constructor(private driversFacade: DriversFacade) {
    this.driversFacade.init();
  }
}
