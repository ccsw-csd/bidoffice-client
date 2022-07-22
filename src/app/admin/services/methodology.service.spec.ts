import { TestBed } from '@angular/core/testing';

import { MethodologyService } from './methodology.service';

describe('MethodologyService', () => {
  let service: MethodologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
