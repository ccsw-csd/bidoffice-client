import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Methodology } from '../../model/Methodology';

import { MethodologyEditComponent } from './methodology-edit.component';

describe('MethodologyEditComponent', () => {
  let methodologyEditComponent: MethodologyEditComponent;
  let mockDynamicDialogRef: any;
  let mockDynamicDialogConfig: any;
  let mockMethodologyService: any;
  let mockSnackService;

  beforeEach(() => {
    let METHODOLOGY: Methodology[];
    let METHODOLOGY_EDITED: Methodology[];
    let METHODOLOGY_SAVED: Methodology[];

    mockMethodologyService = jasmine.createSpyObj(['saveMethodology']);
    mockDynamicDialogRef = jasmine.createSpyObj(['close', 'onClose', 'destroy', 'onDestroy']);
    mockDynamicDialogConfig = jasmine.createSpyObj(['']);
    mockSnackService = jasmine.createSpyObj(["error","showMessage"])
        
    methodologyEditComponent = new MethodologyEditComponent(mockMethodologyService,mockDynamicDialogRef,mockDynamicDialogConfig, mockSnackService);
  });

  it("editMethodologyShouldUpdate",()=>{
    let editedMethodology = new Methodology({id:4,name:"New name",priority:6})
    mockMethodologyService.saveMethodology.and.returnValue(of(true))
    mockDynamicDialogRef.close.and.returnValue(of(true))
    methodologyEditComponent.editMethodology(editedMethodology)
    expect(methodologyEditComponent.editMethodology(editedMethodology)).not.toBeNull()
  })
  
  it("editMethodologyWithExistsNameShouldThrowError",()=>{
    let editedMethodology = new Methodology({id:4,name:"Exists name",priority:6})
    let errorResponse = new HttpErrorResponse({status:409, error: {}});
    mockMethodologyService.saveMethodology.and.returnValue(throwError(() => errorResponse))
    methodologyEditComponent.editMethodology(editedMethodology)
    expect(methodologyEditComponent.editMethodology(editedMethodology)).not.toBeNull()
  })
  
  it("editMethodologyWithExistsPriorityShouldThrowError",()=>{
    let editedMethodology = new Methodology({id:4,name:"New name",priority:6})
    let errorResponse = new HttpErrorResponse({status:409, error: {}});
    mockMethodologyService.saveMethodology.and.returnValue(throwError(() => errorResponse))
    methodologyEditComponent.editMethodology(editedMethodology)
    expect(methodologyEditComponent.editMethodology(editedMethodology)).not.toBeNull()
  })

  it("editMethodologyWithEmptyFieldsShouldThrowError",()=>{
    let editedMethodology = new Methodology({id:4,name:"",priority:null})
    methodologyEditComponent.editMethodology(editedMethodology)
    expect(methodologyEditComponent.editMethodology(editedMethodology)).not.toBeNull()
  })
});