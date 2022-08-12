import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
    private messageService: MessageService
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
          this.showSuccessMessage();
          this.ref.close();
        }, 
        error: ()=>{
          this.showErrorMessage();
        }
      })
  }
  
  showErrorMessage(){
    this.messageService.add({
      key:'fileTypeMessage',
      severity:'error',
      summary:'Error',
      detail:'El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar'
    })
  }

  showSuccessMessage(){
    this.messageService.add({
      key:'fileTypeMessage',
      severity:'success',
      summary:'Confirmado',
      detail:'El registro se ha guardado con éxito'
    })
  }

  onClose() {
    this.ref.close();
  }
  
}
