import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../../model/FileType';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FileTypeEditComponent } from '../file-type-edit/file-type-edit.component';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.scss'],
  providers:[ConfirmationService]
})
export class FileTypeListComponent implements OnInit {

  public dataSource : FileType[]
  public isloading: boolean = false;

  constructor(
    private fileTypeService: FileTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService,
    ) { }

  ngOnInit(): void {
    this.getFileTypes()
  }

  getFileTypes():void {
    this.isloading = true;
    this.fileTypeService.getFileTypes().subscribe({
      next: (files: FileType[]) => { 
        this.dataSource = files
      },
      error: () => {},
      complete: () => {
        this.isloading = false;
      }     
    })
  }

  editFileType(fileType: FileType) {
    const ref = this.dialogService.open(FileTypeEditComponent, {
        data: { fileType: fileType },
        header: 'Edite el Item',
        width: '40%',
        closable:false,
        
    });
    ref.onClose.subscribe(() => {
      this.ngOnInit()
    });
  }
  
  saveFileType() {
    const ref = this.dialogService.open(FileTypeEditComponent, {
        header: 'Crear nuevo Item',
        width: '40%',
        closable:false,
    });
    ref.onClose.subscribe(() => {
      this.ngOnInit()     
    });
  }

  deleteFileType(fileType: FileType) {    
    this.confirmationService.confirm({
      header: "¡ Atención !",
      message: 'Si borra el tipo de fichero, se eliminarán los datos del mismo.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
      acceptLabel:"Aceptar" ,
      acceptIcon: "ui-icon-blank",
      rejectLabel:"Cancelar",
      rejectIcon: "ui-icon-blank",
      rejectButtonStyleClass:"p-button-secondary",
      accept: () => 
      {
        this.fileTypeService.deleteFileTypeById(fileType.id).subscribe({
          next: () =>{
            this.showMessageDeleted()
            this.getFileTypes()
          },
          error:() =>{            
            this.showMessageError();
            this.getFileTypes()
          }
        })
      },
      reject: () =>{
        this.getFileTypes()
      }
    })
  }  

  showMessageError(){
    this.messageService.add({key: 'fileTypeMessage', severity:'error', summary: 'ERROR', detail: 'No puedes borrar un item asociado a una oferta'});
  }
  showMessageDeleted(){
    this.messageService.add({key: 'fileTypeMessage', severity:'success', summary: 'Confirmado', detail: 'El registro ha sido borrado con éxito'});
  }
}