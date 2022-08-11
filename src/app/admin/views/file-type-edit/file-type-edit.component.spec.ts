import { of, throwError } from 'rxjs';
import { FileType } from '../../model/FileType';
import { FileTypeEditComponent } from './file-type-edit.component';

describe('FileTypeEditComponent', () => {
  
    let fileTypeEditComponent: FileTypeEditComponent;
    let mockDynamicDialogRef: any;
    let mockDynamicDialogConfig: any;
    let mockFileTypeService: any;

    beforeEach(() => {
      
      mockFileTypeService = jasmine.createSpyObj(['saveFileType','getFileTypes']);
      
      fileTypeEditComponent = new FileTypeEditComponent(mockDynamicDialogRef,mockDynamicDialogConfig,mockFileTypeService);
      
      });
  
      it("editFileTypeShouldEdit",()=>{
        let editedFileType = new FileType({id:3,name:"New test",priority:1})
        mockFileTypeService.saveFileType.and.returnValue(of(true))
        fileTypeEditComponent.onSave(editedFileType)
        expect(fileTypeEditComponent.onSave(editedFileType)).not.toBeNull()
        expect(fileTypeEditComponent.exceptionFail).toEqual(false)
        expect(fileTypeEditComponent.exceptionMissing).toEqual(false)
      })
  
      it("editFileTypeWrongNameShouldNotEdit",()=>{
        let editedFileType = new FileType({id:3,name:"New test",priority:3})
        mockFileTypeService.saveFileType.and.returnValue(throwError(() => {409}))
        fileTypeEditComponent.onSave(editedFileType)
        expect(fileTypeEditComponent.onSave(editedFileType)).not.toBeNull()
        expect(fileTypeEditComponent.exceptionFail).toEqual(true)
        expect(fileTypeEditComponent.exceptionMissing).toEqual(false)
      })

      it("editFileTypeWrongPriorityShouldNotEdit",()=>{
        let editedFileType = new FileType({id:3,name:"test1",priority:1})
        mockFileTypeService.saveFileType.and.returnValue(throwError(() => {409}))
        fileTypeEditComponent.onSave(editedFileType)
        expect(fileTypeEditComponent.onSave(editedFileType)).not.toBeNull()
        expect(fileTypeEditComponent.exceptionFail).toEqual(true)
        expect(fileTypeEditComponent.exceptionMissing).toEqual(false)
      })

      it("editFileTypeEmptyFieldsShouldNotEdit",()=>{
        let editedFileType = new FileType({})
        mockFileTypeService.saveFileType.and.returnValue(of(false))
        fileTypeEditComponent.onSave(editedFileType)
        expect(fileTypeEditComponent.onSave(editedFileType)).not.toBeNull()
        expect(fileTypeEditComponent.exceptionFail).toEqual(false)
        expect(fileTypeEditComponent.exceptionMissing).toEqual(true)
      })
      
  });