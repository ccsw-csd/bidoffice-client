import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { OpportunityType } from '../../model/OppurtinityType';

import { OpportunityTypeEditComponent } from './opportunity-type-edit.component';

describe('OpportunityTypeEditComponent', () => {
  let opportunityType: OpportunityTypeEditComponent;
  let fixture: ComponentFixture<OpportunityTypeEditComponent>;

  let mockOpportunityTypeService;
  let mockSnackService;
  let mockDialogRef;
  let mockDialogConfig;

  beforeEach(() => {
    mockOpportunityTypeService = jasmine.createSpyObj(["findAll","delete","save"])
    mockSnackService = jasmine.createSpyObj(["error","showMessage"])
    mockDialogRef = jasmine.createSpyObj(["close"])
    mockDialogConfig = jasmine.createSpyObj([""])
    opportunityType = new OpportunityTypeEditComponent(
      mockDialogRef,
      mockDialogConfig,
      mockOpportunityTypeService,
      mockSnackService,
      );
  });

  it('saveWithoutDupplicatedAttributesShouldEdit',() =>{   
    let elementEdited =  new OpportunityType({id:1,name:"Test Edited",priority:3})
    mockOpportunityTypeService.save.and.returnValue(of(true))
    opportunityType.saveItem(elementEdited)
    expect(opportunityType.saveItem(elementEdited)).not.toEqual(null)
  });

  it('saveWithDupplicatedAttributesShouldThrowError',() =>{
    let errorResponse = new HttpErrorResponse({ status: 409, error: {}});
    let elementEdited = new OpportunityType({id:1,name:"Name exists",priority:3})
    mockOpportunityTypeService.save.and.returnValue(throwError(() => errorResponse))
    opportunityType.saveItem(elementEdited)
    expect(opportunityType.saveItem(elementEdited)).not.toEqual(null)
  });
});
