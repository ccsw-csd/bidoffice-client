import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';

import { MethodologyListComponent } from './methodology-list.component';

describe('MethodologyListComponent', () => {
  let methodologyListComponent: MethodologyListComponent;
  let mockOfferService;

  beforeEach(() => {
    mockOfferService = jasmine.createSpyObj(["findAll"]);
    methodologyListComponent = new MethodologyListComponent(mockOfferService);
  });

  it('findAllShouldReturnMethodologies', () => {
    let methodologyList : BaseClass[];
    
    mockOfferService.findAll.and.returnValue(of(methodologyList));
    methodologyListComponent.findAll();

    expect(methodologyListComponent.methodologyItemList).toEqual(methodologyList);
  });
});
