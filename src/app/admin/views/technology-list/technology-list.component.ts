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

        let headerChoice;
        let dataChoice;

        if (technology != null) {
            headerChoice = 'Editar ' + technology.name;
            dataChoice = technology;
        }
        else {
            headerChoice = 'Nueva tecnología';
            dataChoice = new Technology();
        }

        this.ref = this.dialogService.open(TechnologyEditComponent, {
            header: headerChoice,
            width: '40%',
            data: {
                technologyData: dataChoice
            },
            closable: false
        });
        
        this.ref.onClose.subscribe (
            (results: boolean) => {
                if (results) this.findAll();
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
    
    /**
     * Cierra el cuadro de confirmación sin realizar
     * ninguna acción.
     */
     closeDialog() {
        this.snackbarService.closeConfirmDialog();
    }

    /**
     * Cierra el cuadro de confirmación, intentando
     * borrar posteriormente el sector implicado.
     */
    confirmDeletion() {
        this.snackbarService.closeConfirmDialog();
        this.deleteTechnology(this.item);  
    }

    /**
     * Borra una tecnología de la base de datos.
     * 
     * @param item Tecnología a borrar.
     */

    deleteTechnology(item: Technology) {
        this.technologyService.deleteTechnology(item.id).subscribe({
            next: () => {
                this.snackbarService.showMessage('El registro se ha borrado con éxito')    
            },
            error:() => {
                this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
                this.closeDialog()
            },
            complete:() =>{
                this.findAll();
            }
        });
    }
}
