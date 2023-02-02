import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DriversFacade } from 'src/app/+state/drivers/drivers.facade';
import { DriversEntity } from 'src/app/+state/drivers/drivers.models';

import { DriversPageComponent } from './drivers-page.component';

const mockDriversFacade = {
  init: jest.fn(),
  allDrivers$: of([])
}

@Component({
  selector: 'rxf1-hero-devs-drivers-list',
})
export class DriversListTestComponent {
  @Input()
  driversList: DriversEntity[] = [];
}

describe('DriversComponent', () => {
  let component: DriversPageComponent;
  let fixture: ComponentFixture<DriversPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversPageComponent, DriversListTestComponent],
      providers: [{ provide: DriversFacade, useValue: mockDriversFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(DriversPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
