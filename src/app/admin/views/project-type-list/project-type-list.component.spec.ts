import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectTypeListComponent } from './project-type-list.component';
import { of } from "rxjs";
import { ProjectType } from "../../model/ProjectType";

describe('ProjectTypeListComponent', () => {
  let projectTypeListComponent: ProjectTypeListComponent;
  let mockProjectTypeService;
  let confirmationService;
  let messageService;

  let DATA_LIST = [
    new ProjectType({id:1, name:"Name 1", priority: 1}),
    new ProjectType({id:2, name:"Name 2", priority: 2}),
  ]

  let DATA_LIST_DELETED = [
    new ProjectType({id:1, name:"Name 1", priority: 1}),
  ]

  beforeEach(() => {
    mockProjectTypeService = jasmine.createSpyObj(["findAll", "delete"]);
    confirmationService = jasmine.createSpyObj(["confirm"]);
    messageService = jasmine.createSpyObj(["add"]);
    projectTypeListComponent = new ProjectTypeListComponent(mockProjectTypeService, confirmationService, messageService);
  });

  it('findAllShouldReturnProjectTypeList', () =>{
    mockProjectTypeService.findAll.and.returnValue(of(DATA_LIST))
    projectTypeListComponent.findAll();
    expect(projectTypeListComponent.listoOfData).not.toEqual(null);
    expect(projectTypeListComponent.listoOfData).toEqual(DATA_LIST);
  });

  it('deleteIfNotUsingProjectTypeShouldDelete', () => {
    mockProjectTypeService.findAll.and.returnValue(of(DATA_LIST_DELETED))
    mockProjectTypeService.delete.and.returnValue(of(projectTypeListComponent.findAll()))
    projectTypeListComponent.delete(DATA_LIST[1])
    expect(projectTypeListComponent.listoOfData).toEqual(DATA_LIST_DELETED)
  });


});
