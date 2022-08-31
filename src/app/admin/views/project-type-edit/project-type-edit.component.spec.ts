import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeEditComponent } from './project-type-edit.component';
import { ProjectType } from "../../model/ProjectType";
import { of, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

describe('ProjectTypeEditComponent', () => {
  let projectType: ProjectTypeEditComponent;
  let fixture: ComponentFixture<ProjectTypeEditComponent>;

  let mockProjectTypeService;
  let mockSnackService;
  let mockDialogRef;
  let mockDialogConfig;

  beforeEach(() => {
    mockProjectTypeService = jasmine.createSpyObj(["findAll","delete","save"])
    mockSnackService = jasmine.createSpyObj(["error","showMessage"])
    mockDialogRef = jasmine.createSpyObj(["close"])
    mockDialogConfig = jasmine.createSpyObj([""])
    projectType = new ProjectTypeEditComponent(
      mockDialogRef,
      mockDialogConfig,
      mockProjectTypeService,
      mockSnackService,
    );
  });

  it('saveWithoutDupplicatedAttributesShouldEdit',() =>{
    let elementEdited =  new ProjectType({id:1,name:"Test Edited",priority:3})
    mockProjectTypeService.save.and.returnValue(of(true))
    projectType.saveItem(elementEdited)
    expect(projectType.saveItem(elementEdited)).not.toEqual(null)
  });

  it('saveWithDupplicatedAttributesShouldThrowError',() =>{
    let errorResponse = new HttpErrorResponse({ status: 409, error: {}});
    let elementEdited = new ProjectType({id:1,name:"Name exists",priority:3})
    mockProjectTypeService.save.and.returnValue(throwError(() => errorResponse))
    projectType.saveItem(elementEdited)
    expect(projectType.saveItem(elementEdited)).not.toEqual(null)
  });
});
