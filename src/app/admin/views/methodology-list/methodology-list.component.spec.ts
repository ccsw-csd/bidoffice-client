import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Methodology } from '../../model/Methodology';

import { MethodologyListComponent } from './methodology-list.component';

describe('MethodologyListComponent', () => {
  let methodologyListComponent: MethodologyListComponent;
  let mockMethodologyService;
  let mockDynamicDialogService;

  beforeEach(() => {
    mockMethodologyService = jasmine.createSpyObj(["findAll"]);
    methodologyListComponent = new MethodologyListComponent(mockMethodologyService, mockDynamicDialogService);
  });

  it('findAllShouldReturnMethodologies', () => {
    let methodologyList : Methodology[];
    
    mockMethodologyService.findAll.and.returnValue(of(methodologyList));
    methodologyListComponent.findAll();

    expect(methodologyListComponent.methodologyItemList).toEqual(methodologyList);
  });
});
