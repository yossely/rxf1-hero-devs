import { Component, Input } from '@angular/core';
import { DriversEntity } from 'src/app/+state/drivers/drivers.models';

@Component({
  selector: 'rxf1-hero-devs-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent {
  @Input()
  driversList: DriversEntity[] = [];

  driversListTableColumns: string[] = ['permanentNumber', 'givenName', 'familyName', 'nationality'];
}
