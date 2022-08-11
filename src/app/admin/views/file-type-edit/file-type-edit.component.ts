import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
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
  exceptionMissing: boolean

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fileTypeService: FileTypeService, 
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
    if( fileType.name!== undefined && fileType.name!="" && fileType.priority>0 ){
      this.fileTypeService.saveFileType(fileType).subscribe({
        next: ()=> {
          this.exceptionFail=false
          this.exceptionMissing=false
          this.ref.close();
        }, 
        error: ()=>{
              this.exceptionMissing=false
              this.exceptionFail=true
        }
      })
    }else{
      this.exceptionFail=false
      this.exceptionMissing=true
    }
  }  

  onClose() {
    this.ref.close();
  }
  
}
