import { TestBed } from '@angular/core/testing';

import { HyperscalerService } from './hyperscaler.service';

describe('HyperscalerService', () => {
  let service: HyperscalerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HyperscalerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
