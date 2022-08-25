import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../../model/FileType';
import { DialogService } from 'primeng/dynamicdialog';
import { FileTypeEditComponent } from '../file-type-edit/file-type-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.scss'],
})
export class FileTypeListComponent implements OnInit {

  public dataSource : FileType[]
  public isloading: boolean = false;

  constructor(
    private fileTypeService: FileTypeService,
    public dialogService: DialogService,
    private snackbarService: SnackbarService
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
        header: 'Editar '+ fileType.name,
        width: '40%',
        closable:false,
        
    });
    ref.onClose.subscribe(() => {
      this.ngOnInit()
    });
  }
  
  saveFileType() {
    const ref = this.dialogService.open(FileTypeEditComponent, {
        header: 'Nuevo elemento',
        width: '40%',
        closable:false,
    });
    ref.onClose.subscribe(() => {
      this.ngOnInit()     
    });
  }

  showDialog(){  
    this.snackbarService.showConfirmDialog()
  }

  cancel(){
    this.getFileTypes()
  }

  deleteFileType(fileType: FileType) {    
    this.fileTypeService.deleteFileTypeById(fileType.id).subscribe({
      next: () =>{
        this.snackbarService.showMessage('El registro ha sido borrado con éxito')
        this.getFileTypes()
      },
      error:() =>{            
        this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
        this.getFileTypes()
      }
    })
  }  
}