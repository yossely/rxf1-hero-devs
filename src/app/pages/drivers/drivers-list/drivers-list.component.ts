import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { DriversEntity } from 'src/app/+state/drivers/drivers.models';
import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';

@Component({
  selector: 'rxf1-hero-devs-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent implements AfterViewInit {
  @Input()
  driversList: DriversEntity[] = [];

  @Input()
  totalItems = 0;

  @Output()
  paginationChange = new EventEmitter<ErgastF1APIPaginationQueryParams>();

  driversListTableColumns: string[] = [
    'permanentNumber',
    'givenName',
    'familyName',
    'nationality',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    // ? unsubscribe on destroy
    this.paginator.page.subscribe((pageEvent) => {
      this.paginationChange.emit({
        limit: pageEvent.pageSize,
        offset: pageEvent.pageSize * pageEvent.pageIndex,
      });
    });
  }
}
