import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileType } from '../../model/FileType';
import { FileTypeService } from '../../services/file-type.service';

@Component({
  selector: 'app-file-type-edit',
  templateUrl: './file-type-edit.component.html',
  styleUrls: ['./file-type-edit.component.scss']
})
export class FileTypeEditComponent implements OnInit {

  fileTypeName: string
  fileType: FileType
  exceptionFail: boolean
  
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fileTypeService: FileTypeService, 
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    if (this.config.data != null) {
      this.fileType = Object.assign({fileType:FileType}, this.config.data.fileType);
      this.fileTypeName=this.fileType.name
    }
    else {
      this.fileType = new FileType();
    }
  }

  onSave(fileType: FileType) {
      this.fileTypeService.saveFileType(fileType).subscribe({
        next: ()=> {
          this.snackbarService.showMessage('El registro se ha guardado con éxito')
          this.ref.close(true);
        }, 
        error: ()=>{
          this.snackbarService.error('El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar');
        }
      })
  }
  
  onClose(result: boolean) {
    this.ref.close(result);
  }
  
}
