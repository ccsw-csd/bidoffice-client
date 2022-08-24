import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Offering } from '../../model/Offering';
import { OfferingEditComponent } from './offering-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OfferingEditComponent', () => {
  let offeringEdit: OfferingEditComponent;
  let mockOfferingService;
  let mockDynamicDialogConfig;
  let mockDynamicDialogRef;
  let mockSnackService;
  
  beforeEach( () => {
    mockOfferingService = jasmine.createSpyObj(["getAll", "saveOffering", "deleteOffering"])
    mockDynamicDialogConfig = jasmine.createSpyObj([""])
    mockDynamicDialogRef = jasmine.createSpyObj(["close"])
    offeringEdit = new OfferingEditComponent(
      mockDynamicDialogRef,
      mockDynamicDialogConfig,
      mockOfferingService,
      mockSnackService = jasmine.createSpyObj(["error", "showMessage"])
      );
  });

  it('editIfArgumentsAreCorrect', () =>{
    let element = new Offering({id:1,name:"New Element",priority:40})
    mockOfferingService.saveOffering.and.returnValue(of(element))
    offeringEdit.onSave(element)
    expect(offeringEdit.offering).not.toBeNull()
  });

  it('notEditIfNameOrPriorityAlreadyExists', () =>{
    let error = new HttpErrorResponse({ status: 409, error:{}})
    let element = new Offering({id:3,name:'Name2',priority:1})
    mockOfferingService.saveOffering.and.returnValue(throwError(() => error))
    offeringEdit.onSave(element)
    expect(offeringEdit.offering).not.toBeNull()
  });

});
