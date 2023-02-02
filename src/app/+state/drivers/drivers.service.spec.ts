import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DriversService } from './drivers.service';

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriversService, { provide: HttpClient, useValue: { get: jest.fn() } }]
    });
    service = TestBed.inject(DriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
