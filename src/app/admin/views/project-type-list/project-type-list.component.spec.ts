import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectTypeListComponent } from './project-type-list.component';
import { of } from "rxjs";
import { ProjectType } from "../../model/ProjectType";

describe('ProjectTypeListComponent', () => {
  let projectTypeListComponent;
  let mockProjectTypeService;

  let DATA_LIST = [
    new ProjectType({id:1, name:"Name 1", priority: 1}),
    new ProjectType({id:2, name:"Name 2", priority: 2}),
  ]

  beforeEach(() => {
    mockProjectTypeService = jasmine.createSpyObj(["findAll"]);
    projectTypeListComponent = new ProjectTypeListComponent(mockProjectTypeService);
  })

  it('findAllShouldReturnProjectTypeList', () =>{
    mockProjectTypeService.findAll.and.returnValue(of(DATA_LIST))
    projectTypeListComponent.findAll();
    expect(projectTypeListComponent.listoOfData).not.toEqual(null);
    expect(projectTypeListComponent.listoOfData).toEqual(DATA_LIST);
  });


});
