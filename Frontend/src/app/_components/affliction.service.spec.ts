import { TestBed } from '@angular/core/testing';

import { AfflictionService } from './affliction.service';

describe('AfflictionService', () => {
  let service: AfflictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfflictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
