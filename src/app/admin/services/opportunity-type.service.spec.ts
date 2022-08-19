import { TestBed } from '@angular/core/testing';

import { OpportunityTypeService } from './opportunity-type.service';

describe('OpportunityTypeService', () => {
  let service: OpportunityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpportunityTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
