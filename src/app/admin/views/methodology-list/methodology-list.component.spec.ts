import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Methodology } from '../../model/Methodology';

import { MethodologyListComponent } from './methodology-list.component';

describe('MethodologyListComponent', () => {
  let methodologyListComponent: MethodologyListComponent;
  let mockMethodologyService;
  let mockConfirmationService;
  let mockMessageService;
  let mockDynamicDialogService;

  let DATA_LIST = [
    new Methodology({id:1, name: "Name 1", priority:1}),
    new Methodology({id:2, name: "Name 2", priority:2})
  ]

  let DATA_LIST_DELETED = [
    new Methodology({id:1, name: "Name 1", priority:1})
  ]  

  beforeEach(() => {
    mockMethodologyService = jasmine.createSpyObj(["findAll","delete"]);
    mockConfirmationService = jasmine.createSpyObj(["confirm"])
    mockMessageService = jasmine.createSpyObj(["add"])
    methodologyListComponent = new MethodologyListComponent(
      mockMethodologyService,
      mockDynamicDialogService,
      mockConfirmationService,
      mockMessageService
      );
  });

  it('findAllShouldReturnMethodologies', () => {
    let methodologyList : Methodology[];
    
    mockMethodologyService.findAll.and.returnValue(of(methodologyList));
    methodologyListComponent.findAll();

    expect(methodologyListComponent.methodologyItemList).toEqual(methodologyList);
  });

  it('deleteIfDoesNotExistInOfferShouldDelete', () =>{
    mockMethodologyService.findAll.and.returnValue(of(DATA_LIST_DELETED))
    mockMethodologyService.delete.and.returnValue(of(methodologyListComponent.findAll()))
    methodologyListComponent.deleteItem(DATA_LIST[1])
    expect(methodologyListComponent.methodologyItemList).toEqual(DATA_LIST_DELETED)
  })
});
