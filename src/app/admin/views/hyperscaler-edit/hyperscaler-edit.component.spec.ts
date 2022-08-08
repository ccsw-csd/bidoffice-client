import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Hyperscaler } from '../../model/Hyperscaler';

import { HyperscalerEditComponent } from './hyperscaler-edit.component';

describe('HyperscalerEditComponent', () => {
  let hyperscalerEdit: HyperscalerEditComponent;
  let mockHyperscalerService, mockDialogConfig, mockDynamicDialogRef
  
  beforeEach( () => {
    mockHyperscalerService = jasmine.createSpyObj(["getDataHyperscaler","deleteHyperscaler","saveHyperscaler"])
    mockDialogConfig = jasmine.createSpyObj([""])
    mockDynamicDialogRef = jasmine.createSpyObj(["close"])
    hyperscalerEdit = new HyperscalerEditComponent(
      mockDynamicDialogRef,
      mockDialogConfig,     
      mockHyperscalerService
      )
  });

  it('saveShouldSaveIfArgumentsAreCorrect', () =>{
    let elementEdited = new Hyperscaler({id:1,name:"Test Edited",priority:3})
    mockHyperscalerService.saveHyperscaler.and.returnValue(of(true))
    hyperscalerEdit.saveChanges(elementEdited)
    expect(hyperscalerEdit.saveChanges(elementEdited)).not.toEqual(null)
    expect(hyperscalerEdit.existsPriority).toEqual(false)
    expect(hyperscalerEdit.fieldsNull).toEqual(false)  
  })

  it('saveShouldNotSaveIfPriorityOrNameAlreadyExists', () =>{
    let errorResponse = new HttpErrorResponse({ status: 409, error: {}});
    let elementEdited = new Hyperscaler({id:1,name:"Name exists",priority:3})
    mockHyperscalerService.saveHyperscaler.and.returnValue(throwError(() => errorResponse))
    hyperscalerEdit.saveChanges(elementEdited)
    expect(hyperscalerEdit.saveChanges(elementEdited)).not.toEqual(null)
    expect(hyperscalerEdit.existsPriority).toEqual(true)
    expect(hyperscalerEdit.fieldsNull).toEqual(false)  
  })

  it('saveShouldNotSaveIfFieldsAreEmpty', () =>{
    let elementEdited = new Hyperscaler({id:1,name:"",priority:0})
    hyperscalerEdit.saveChanges(elementEdited)
    expect(hyperscalerEdit.saveChanges(elementEdited)).not.toEqual(null)
    expect(hyperscalerEdit.existsPriority).toEqual(false)
    expect(hyperscalerEdit.fieldsNull).toEqual(true)  
  })


});
