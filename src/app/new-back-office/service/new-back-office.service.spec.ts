import { TestBed } from '@angular/core/testing';

import { NewBackOfficeService } from './new-back-office.service';

describe('NewBackOfficeService', () => {
  let service: NewBackOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewBackOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
