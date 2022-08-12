import { of, throwError } from 'rxjs';
import { FileType } from '../../model/FileType';
import { FileTypeEditComponent } from './file-type-edit.component';

describe('FileTypeEditComponent', () => {
  
    let fileTypeEditComponent: FileTypeEditComponent;
    let mockDynamicDialogRef: any;
    let mockDynamicDialogConfig: any;
    let mockFileTypeService: any;
    let mockMessageService: any;

    beforeEach(() => {
      
      mockFileTypeService = jasmine.createSpyObj(['saveFileType','getFileTypes']);
      mockMessageService = jasmine.createSpyObj(['add']);
      mockDynamicDialogConfig= jasmine.createSpyObj(['']);
      mockDynamicDialogRef= jasmine.createSpyObj(['close']);

      fileTypeEditComponent = new FileTypeEditComponent(mockDynamicDialogRef,mockDynamicDialogConfig,mockFileTypeService,mockMessageService );
      });
  
      it("editFileTypeShouldEdit",()=>{
        let editedFileType = new FileType({id:3,name:"New test",priority:1})
        mockFileTypeService.saveFileType.and.returnValue(of(true))
        fileTypeEditComponent.onSave(editedFileType)
        expect(fileTypeEditComponent.onSave(editedFileType)).not.toBeNull()       
      })
  
      it("editFileTypeWrongNameShouldNotEdit",()=>{
        let editedFileType = new FileType({id:3,name:"New test",priority:3})
        mockFileTypeService.saveFileType.and.returnValue(throwError(() => {409}))
        fileTypeEditComponent.onSave(editedFileType)
        expect(fileTypeEditComponent.onSave(editedFileType)).not.toBeNull()       
      })

      it("editFileTypeWrongPriorityShouldNotEdit",()=>{
        let editedFileType = new FileType({id:3,name:"test1",priority:1})
        mockFileTypeService.saveFileType.and.returnValue(throwError(() => {409}))
        fileTypeEditComponent.onSave(editedFileType)
        expect(fileTypeEditComponent.onSave(editedFileType)).not.toBeNull()        
      })
      
  });