import { of } from 'rxjs';
import { FileType } from '../../model/FileType';
import { FileTypeListComponent } from './file-type-list.component';

describe('FileTypeComponent', () => {
  let fileTypeListComponent: FileTypeListComponent;
  let mockFileTypeService: any;
  let mockConfirmationService: any;
  let mockMessageService: any;

  let FILETYPE_ITEM: FileType[];
  let FILETYPE_ITEM_DELETED: FileType[];

  beforeEach(() => {
    FILETYPE_ITEM = [
      new FileType ({id:1,nombre:"test",prioridad:2}),
      new FileType({id:2,nombre:"test2",prioridad:3}),
      new FileType({id:3,nombre:"tes3t",prioridad:1}),
    ]
    FILETYPE_ITEM_DELETED = [
      new FileType ({id:1,nombre:"test",prioridad:2}),
      new FileType({id:2,nombre:"test2",prioridad:3}),
    ]

    mockFileTypeService = jasmine.createSpyObj(['getFileTypes','deleteFileTypeById']);
    mockConfirmationService= jasmine.createSpyObj(["confirm","close"]);
    mockMessageService = jasmine.createSpyObj([""]);
    fileTypeListComponent = new FileTypeListComponent(mockFileTypeService,mockConfirmationService,mockMessageService);
    });

    it("deleteFileTypeShouldDelete",()=>{
        mockFileTypeService.getFileTypes.and.returnValue(of(FILETYPE_ITEM_DELETED))
        mockFileTypeService.deleteFileTypeById.and.returnValue(of(fileTypeListComponent.ngOnInit()))
        fileTypeListComponent.deleteFileType(FILETYPE_ITEM[2])
        expect(fileTypeListComponent.dataSource).not.toBeNull()
        expect(fileTypeListComponent.dataSource).toBe(FILETYPE_ITEM_DELETED)
    })

  
    it("findAllFileTypes",()=>{
      mockFileTypeService.getFileTypes.and.returnValue(of(FILETYPE_ITEM)); 
      fileTypeListComponent.ngOnInit()
      expect(fileTypeListComponent.dataSource).not.toEqual(null);
      expect(fileTypeListComponent.dataSource).toEqual(FILETYPE_ITEM);
    });
  
});