import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { RacesEntity } from 'src/app/+state/races/races.models';
import { ErgastF1APIPaginationQueryParams } from 'src/app/shared/models/eargast-f1-api.models';

@Component({
  selector: 'rxf1-hero-devs-races-list',
  templateUrl: './races-list.component.html',
  styleUrls: ['./races-list.component.scss'],
})
export class RacesListComponent implements AfterViewInit {
  @Input()
  racesList: RacesEntity[] = [];

  @Input()
  totalItems = 0;

  @Output()
  paginationChange = new EventEmitter<ErgastF1APIPaginationQueryParams>();

  driversListTableColumns: string[] = ['raceId', 'raceName', 'raceUrl'];

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
