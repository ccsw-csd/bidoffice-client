import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';

import { DocumentationEditComponent } from './documentation-edit.component';

describe('DocumentationEditComponent', () => {
  let component: DocumentationEditComponent;
  let mockOfferService;
  let fileTypes: BaseClass[];
  beforeEach(() => {
    fileTypes = [
      {
        id: 1,
        name: 'base',
        priority: 1,
      },
      {
        id: 2,
        name: 'base2',
        priority: 1,
      },
    ];

    mockOfferService = jasmine.createSpyObj(['getAllFileTypes']);
    component = new DocumentationEditComponent(
      mockOfferService,
      jasmine.createSpyObj(['']),
      jasmine.createSpyObj([''])
    );
  });

  it('shouldReturnListFileTypes', () => {
    mockOfferService.getAllFileTypes.and.returnValue(of(fileTypes));
    component.getAllFileTypes();
    expect(component.fileTypes).not.toEqual(null);
    expect(component.fileTypes).toEqual(fileTypes);
  });
});
