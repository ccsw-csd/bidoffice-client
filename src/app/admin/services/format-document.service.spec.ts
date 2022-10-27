import { TestBed } from '@angular/core/testing';

import { FormatDocumentService } from './format-document.service';

describe('FormatDocumentService', () => {
  let service: FormatDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
