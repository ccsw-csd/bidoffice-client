import { Component, OnInit } from '@angular/core';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { TechnologyEditComponent } from '../technology-edit/technology-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
    selector: 'app-technology-list',
    templateUrl: './technology-list.component.html',
    styleUrls: ['./technology-list.component.scss'],
    providers: [ DynamicDialogRef, DynamicDialogConfig, DialogService]
})

export class TechnologyListComponent implements OnInit {

    technologies: Technology[];
    public isLoading: boolean = false;
    isDeleted: boolean = false;
    item: Technology;

    constructor(
        private technologyService: TechnologyService,
        private dialogService: DialogService,
        private snackbarService: SnackbarService,
        private ref: DynamicDialogRef
    ) { }

    ngOnInit(): void {
        this.findAll();
    }

    /**
     * Guarda los datos de una nueva tecnología o
     * modifica los de una tecnología ya existente.
     */
    editTechnology(technology?: Technology): void {

        if (technology != null) {
            this.ref = this.dialogService.open(TechnologyEditComponent, {
                header: 'Editar ' + technology.name,
                width: '40%',
                data: {
                    technologyData: technology
                },
                closable: false
            });
        }
        else {
            this.ref = this.dialogService.open(TechnologyEditComponent, {
                header: 'Nuevo elemento',
                width: '40%',
                data: {},
                closable: false
            });
        }
        
        this.ref.onClose.subscribe (
            res => {
                this.findAll();
            }
        );
    }

    /**
     * Recupera el listado de tecnologías del servicio
     * y los carga en el vector.
     */
    findAll() {
        this.isLoading = true;
        this.technologyService.findAll().subscribe({
            next: (results:any) => {
                this.technologies = results;
            },
            error: () => {},
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    showDialog(element?: Technology){   
        this.item=element 
        this.snackbarService.showConfirmDialog()
    }
    
    changeFlagForDelete(){
        this.isDeleted = true
        this.deleteTechnology(this.item)
    }
    
    
    closeDialog(){
        this.snackbarService.closeConfirmDialog()
        if(this.isDeleted==false){
          this.findAll()
        }
    }

    /**
     * Borra una tecnología de la base de datos.
     * 
     * @param technology Tecnología a borrar.
     */

     deleteTechnology(item: Technology) {
        if(this.isDeleted){
            this.technologyService.deleteTechnology(item.id).subscribe({
                next: () => {
                    this.snackbarService.showMessage('El registro se ha borrado con éxito')    
                },
                error:() => {
                    this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
                    this.closeDialog()
                },
                complete:() =>{
                    this.isDeleted = false
                    this.closeDialog()
                }
            });
        }
    }
}
