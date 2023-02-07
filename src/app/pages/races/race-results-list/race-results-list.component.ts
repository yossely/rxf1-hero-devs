import { Component, Input } from '@angular/core';
import { RacesFinalResult } from 'src/app/+state/races/races.models';

@Component({
  selector: 'rxf1-hero-devs-race-results-list',
  templateUrl: './race-results-list.component.html',
  styleUrls: ['./race-results-list.component.scss'],
})
export class RaceResultsListComponent {
  @Input()
  raceFinalResults: RacesFinalResult[] = [];

  raceFinalResultsListTableColumns: string[] = [
    'position',
    'number',
    'points',
    'driverName',
    'driverNationality',
    'time',
  ];
}
