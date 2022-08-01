import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileType } from '../../model/FileType';
import { FileTypeService } from '../../services/file-type.service';

@Component({
  selector: 'app-file-type-edit',
  templateUrl: './file-type-edit.component.html',
  styleUrls: ['./file-type-edit.component.scss']
})
export class FileTypeEditComponent implements OnInit {

  fileType: FileType

  constructor(
          public ref: DynamicDialogRef,
          public config: DynamicDialogConfig,
          private fileTypeService: FileTypeService,
          private messageService: MessageService,
     ) { }

  ngOnInit(): void {
    if (this.config.data != null) {
      this.fileType = Object.assign({fileType:FileType}, this.config.data.fileType);
    }
    else {
      this.fileType = new FileType();
    }
  }


  onSave() {
    //if(this.validarFechas(this.prestamo)==true && this.validarDiasPrestado(this.prestamo)==true && this.resultsGame==true && this.resultsClient==true)
    this.fileTypeService.saveFileType(this.fileType).subscribe({
      next: ()=> {
          this.ref.close();
      }, error: ()=>{
          this.showMessageError()
      }
    })
    
  }  


  showMessageError(){
    this.messageService.add({key: 'priorityError', severity:'error', summary: 'ERROR', detail: 'Ya hay un item creado con la misma prioridad'});
  }
}
