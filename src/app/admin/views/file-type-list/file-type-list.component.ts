import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../../model/FileType';
import { DialogService } from 'primeng/dynamicdialog';
import { FileTypeEditComponent } from '../file-type-edit/file-type-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { GeneralConfirmationService } from 'src/app/core/services/general-confirmation.service';

@Component({
    selector: 'app-file-type',
    templateUrl: './file-type-list.component.html',
    styleUrls: ['./file-type-list.component.scss'],
})

export class FileTypeListComponent implements OnInit {

    public dataSource : FileType[]
    public isloading: boolean = false;
    public isDeleted: boolean = false
    public item: FileType

    constructor(
        private fileTypeService: FileTypeService,
        public dialogService: DialogService,
        private snackbarService: SnackbarService,
        private confirmationService : GeneralConfirmationService,
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
        ref.onClose.subscribe((result: boolean) => {
            if (result) this.getFileTypes();
        });
    }
  
    saveFileType() {
        const ref = this.dialogService.open(FileTypeEditComponent, {
            header: 'Nuevo elemento',
            width: '40%',
            closable:false,
        });
        ref.onClose.subscribe((result: boolean) => {
            if (result) this.getFileTypes();
        });
    }

    showDialog(element: FileType){    
        this.item = element
        this.confirmationService.showConfirmDialog()
    }

   /**
     * Cierra el cuadro de confirmación sin realizar
     * ninguna acción.
     */
    closeDialog() {
        this.confirmationService.closeConfirmDialog();
    }

    /**
     * Cierra el cuadro de confirmación, intentando
     * borrar posteriormente el sector implicado.
     */
    confirmDeletion() {
        this.confirmationService.closeConfirmDialog();
        this.deleteFileType(this.item);  
    }

    deleteFileType(fileType: FileType) {    
        this.fileTypeService.deleteFileTypeById(fileType.id).subscribe({
            next: () =>{
                this.snackbarService.showMessage('El registro ha sido borrado con éxito')
            },
            error:() =>{            
                this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
                this.closeDialog()
            },
            complete:() =>{
                this.getFileTypes();
            }
        })
    }  
}