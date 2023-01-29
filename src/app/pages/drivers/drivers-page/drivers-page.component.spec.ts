import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversPageComponent } from './drivers-page.component';

describe('DriversComponent', () => {
  let component: DriversPageComponent;
  let fixture: ComponentFixture<DriversPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DriversPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
