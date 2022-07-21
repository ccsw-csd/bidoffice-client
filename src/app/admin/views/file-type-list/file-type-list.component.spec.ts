import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FileType } from '../../model/FileType';

import { FileTypeListComponent } from './file-type-list.component';

describe('FileTypeComponent', () => {
  let fileTypeListComponent: FileTypeListComponent;
  let fixture: ComponentFixture<FileTypeListComponent>;
  let mockFileTypeService;

  let FILETYPE_ITEM = [
    new FileType({id:1,nombre:"test",prioridad:2})
  ] ;

  beforeEach(() => {
    mockFileTypeService = jasmine.createSpyObj(["getFileTypes"]);
    fileTypeListComponent = new FileTypeListComponent(mockFileTypeService);
  });


  it("findAllFileTypes",()=>{

    let listaFileTypes = new FileType() 
    mockFileTypeService.getFileTypes.and.returnValue(of(FILETYPE_ITEM)); 

    fileTypeListComponent.ngOnInit()
    expect(fileTypeListComponent.dataSource).not.toEqual(null);
    
    expect(fileTypeListComponent.dataSource).toEqual(FILETYPE_ITEM);

  });


  
});
