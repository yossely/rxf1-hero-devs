/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { RacesListComponent } from './races-list.component';
import { RacesEntity } from 'src/app/+state/races/races.models';
import { RacesFacade } from 'src/app/+state/races/races.facade';
import { SeasonsFacade } from 'src/app/+state/seasons/seasons.facade';
import { SeasonsEntity } from 'src/app/+state/seasons/seasons.models';

class RacesFacadeMock {
  allRaces$ = new BehaviorSubject<RacesEntity[]>([
    {
      id: '1',
      name: 'Race one',
      date: '2018-11-12',
      url: 'race-one.com',
    },
  ]);
  totalRaces$ = new BehaviorSubject<number>(20);

  init = jest.fn();
  selectRace = jest.fn();
  clearSelectedRace = jest.fn();
}

class SeasonsFacadeMock {
  selectedSeason$ = new BehaviorSubject<SeasonsEntity | undefined>({
    id: '2018',
  });
}

describe('RacesListComponent', () => {
  let component: RacesListComponent;
  let fixture: ComponentFixture<RacesListComponent>;
  let loader: HarnessLoader;

  let racesFacadeMock: RacesFacadeMock;
  let seasonsFacadeMock: SeasonsFacadeMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
      ],
      declarations: [RacesListComponent],
      providers: [
        {
          provide: RacesFacade,
          useValue: new RacesFacadeMock(),
        },
        {
          provide: SeasonsFacade,
          useValue: new SeasonsFacadeMock(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  beforeEach(() => {
    racesFacadeMock = TestBed.inject(RacesFacade) as unknown as RacesFacadeMock;
    seasonsFacadeMock = TestBed.inject(
      SeasonsFacade
    ) as unknown as SeasonsFacadeMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Selected Season Update', () => {
    it('should load races based on selected season', async () => {
      const selectedSeason = seasonsFacadeMock.selectedSeason$.value;
      expect(racesFacadeMock.init).toHaveBeenCalledWith(selectedSeason?.id);
    });

    it('should reset paginator on selected season update', async () => {
      const newSeasonSelected: SeasonsEntity = {
        id: '2020',
      };
      await fixture.whenStable();
      jest.spyOn(component.paginator!, 'firstPage');

      seasonsFacadeMock.selectedSeason$.next(newSeasonSelected);

      expect(component.paginator?.firstPage).toHaveBeenCalled();
    });

    it('should clear selected race on selected season update', async () => {
      const newSeasonSelected: SeasonsEntity = {
        id: '2020',
      };
      await fixture.whenStable();

      seasonsFacadeMock.selectedSeason$.next(newSeasonSelected);

      expect(racesFacadeMock.clearSelectedRace).toHaveBeenCalled();
    });

    it('should clear race row highlight on season change', async () => {
      fixture.detectChanges();
      const trDe = fixture.debugElement.queryAll(By.css('tbody>tr.highlight'));

      expect(trDe.length).toBeFalsy();
    });
  });

  it('should load races on pagination change', async () => {
    const paginator = await loader.getHarness(MatPaginatorHarness);

    await paginator.goToNextPage();

    expect(racesFacadeMock.init.mock.calls[1]).toEqual([
      seasonsFacadeMock.selectedSeason$.value?.id,
      {
        limit: 10,
        offset: 10,
      },
    ]);
  });

  it('should calculate limit and offset correctly', async () => {
    const pageEvent: PageEvent = {
      pageSize: 15,
      pageIndex: 3,
      length: 150,
    };

    component.onPageChange(pageEvent);

    expect(racesFacadeMock.init.mock.calls[1]).toEqual([
      seasonsFacadeMock.selectedSeason$.value?.id,
      {
        limit: 15,
        offset: 45,
      },
    ]);
  });

  describe('Race selection', () => {
    const indexToClick = 0;
    let expectedRaceIdClicked: RacesEntity['id'];

    beforeEach(() => {
      expectedRaceIdClicked = racesFacadeMock.allRaces$.value[indexToClick].id;
      const buttonDe = fixture.debugElement.queryAll(
        By.css('[data-test="select-race-button"]')
      )[indexToClick];

      buttonDe.nativeElement.click();
    });

    it('should mark race as selected in store', async () => {
      expect(racesFacadeMock.selectRace).toHaveBeenCalledWith(
        expectedRaceIdClicked
      );
    });

    it('should highlight selected race row on table', async () => {
      fixture.detectChanges();
      const trDe = fixture.debugElement.queryAll(
        By.css('tbody>tr[role="row"]')
      )[indexToClick];

      expect(trDe.nativeElement.className).toContain('highlight');
    });
  });
});
