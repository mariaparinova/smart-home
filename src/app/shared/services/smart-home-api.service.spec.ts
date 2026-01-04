import { TestBed } from '@angular/core/testing';

import { SmartHomeApiService } from './smart-home-api.service';

describe('SmartHomeApiService', () => {
  let service: SmartHomeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartHomeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
