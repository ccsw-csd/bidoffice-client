import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferDataFile } from 'src/app/offer/model/OfferDataFile';

import { DocumentationComponent } from './documentation.component';

describe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fileTypes: BaseClass[];
  let dataFiles: OfferDataFile[];
  let mockOfferService;
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
    dataFiles = [
      {
        uuid: '1',
        id: 1,
        name: 'name',
        link: 'link',
        observations: 'observation',
        fileType: fileTypes[0],
      },
      {
        uuid: '2',
        id: null,
        name: 'name',
        link: 'link',
        observations: 'observation',
        fileType: fileTypes[0],
      },
    ];
    mockOfferService = jasmine.createSpyObj(['getAllFileTypes']);
    component = new DocumentationComponent(
      jasmine.createSpyObj(['']),
      mockOfferService,
      jasmine.createSpyObj([''])
    );
  });

  it('shouldReturnListFileTypesAndCloneRow', () => {
    mockOfferService.getAllFileTypes.and.returnValue(of(fileTypes));
    component.onRowEditInit(dataFiles[0]);

    expect(component.clonedDataFile).not.toEqual(null);
    expect(component.clonedDataFile).toEqual(dataFiles[0]);
    expect(component.fileTypes).not.toEqual(null);
    expect(component.fileTypes).toEqual(fileTypes);
  });
});
