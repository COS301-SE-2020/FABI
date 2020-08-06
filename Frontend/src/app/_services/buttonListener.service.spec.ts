import { TestBed } from '@angular/core/testing';

import { ButtonListenerService } from './buttonListener.service';

describe('StyleSwitchService', () => {
  let service: ButtonListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
