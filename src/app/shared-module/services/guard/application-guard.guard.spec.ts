import { TestBed } from '@angular/core/testing';

import { ApplicationGuardGuard } from './application-guard.guard';

describe('ApplicationGuardGuard', () => {
  let guard: ApplicationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ApplicationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
