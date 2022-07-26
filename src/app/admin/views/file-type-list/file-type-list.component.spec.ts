import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { FileType } from '../../model/FileType';
import { FileTypeService } from '../../services/file-type.service';

import { FileTypeListComponent } from './file-type-list.component';

describe('FileTypeComponent', () => {
  let fileTypeListComponent: FileTypeListComponent;
  let mockFileTypeService: any;
  let mockConfirmationService: any;
  
  let component: FileTypeListComponent;
  let fixture: ComponentFixture<FileTypeListComponent>;

  let FILETYPE_ITEM: FileType[];

  beforeEach(() => {
    FILETYPE_ITEM = [
      new FileType ({id:1,nombre:"test",prioridad:2}),
      new FileType({id:2,nombre:"test2",prioridad:3}),
      new FileType({id:3,nombre:"tes3t",prioridad:1}),
    ] ;

    mockFileTypeService = jasmine.createSpyObj(['getFileTypes','deleteFileTypeById']);
    mockConfirmationService= jasmine.createSpyObj(["confirm","close"]);
    //fileTypeListComponent = new FileTypeListComponent(mockFileTypeService,mockConfirmationService);
    TestBed.configureTestingModule({
      declarations: [FileTypeListComponent],
      providers: [
        {
          provide: FileTypeService,
          useValue: mockFileTypeService,
        },
      ],
    });

    fixture = TestBed.createComponent(FileTypeListComponent);
    component = fixture.componentInstance;
    });


 


describe('deleteById', () =>{

  beforeEach(() => {
    mockFileTypeService.deleteFileTypeById.and.returnValue(of(true));
    component.dataSource = FILETYPE_ITEM;
    
  });

  it('should delete the selected Post from the posts', () => {
    mockFileTypeService.deleteFileTypeById.and.returnValue(of(true));
    component.dataSource = FILETYPE_ITEM;
    component.deleteFileType({id:1,nombre:"test",prioridad:2})

    expect(component.dataSource.length).toBe(2);
  });

    
    

  it('should call the deleteFileType method once', () =>{
      mockFileTypeService.deleteFileTypeById.and.returnValue(of(true));
      component.deleteFileType(FILETYPE_ITEM[1]);
      expect(mockFileTypeService.deleteFileTypeById).toHaveBeenCalledTimes(1);
  });

    

})


/*
  it("deleteByIdFileTypes",()=>{
    let FILETYPE_ITEM_DELETED = [
      new FileType({id:2,nombre:"test2",prioridad:3}),
      new FileType({id:3,nombre:"tes3t",prioridad:1}),
    ] ;

    let id=1;
    let fileType= new FileType({id:1,nombre:"test",prioridad:2})
    mockFileTypeService.deleteFileType(1).and.returnValue(of(true))
    fileTypeListComponent.deleteFileType(fileType)
    console.log("aaaqwrqwer",fileType)

    console.log("aaaaaaaaaaaaaa",fileTypeListComponent.dataSource)
    expect(fileTypeListComponent.dataSource).toEqual(FILETYPE_ITEM_DELETED)
  });
  */
  it("findAllFileTypes",()=>{
    mockFileTypeService.getFileTypes.and.returnValue(of(FILETYPE_ITEM)); 
    component.ngOnInit()
    expect(component.dataSource).not.toEqual(null);
    expect(component.dataSource).toEqual(FILETYPE_ITEM);
  });
  
});
