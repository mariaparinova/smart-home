import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dashboardExistenceGuard } from './dashboard-existence-guard';

describe('dashboardExistenceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => dashboardExistenceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
