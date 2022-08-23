import { Component, OnInit } from '@angular/core';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';
import { ConfirmationService} from 'primeng/api';
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
    providers: [ConfirmationService,  DynamicDialogRef, DynamicDialogConfig, DialogService]
})

export class TechnologyListComponent implements OnInit {

    technologies: Technology[];
    public isLoading: boolean = false;

    constructor(
        private technologyService: TechnologyService,
        private confirmationService: ConfirmationService,
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
                header: 'Nueva tecnología',
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

    /**
     * Borra una tecnología de la base de datos.
     * 
     * @param technology Tecnología a borrar.
     */
    deleteTechnology(technology: Technology) {

        this.confirmationService.confirm({
            header: "¡ Atención !",
            message: 'Si borra la tecnologia, se eliminarán los datos de la misma.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
            acceptLabel: 'Aceptar',
            acceptIcon: 'ui-icon-blank',
            rejectLabel: 'Cancelar',
            rejectIcon: 'ui-icon-blank',
            key: "techDeleteDialog",
            accept: () => {
                this.technologyService.deleteTechnology(technology.id).subscribe({
                    next: () => {
                        this.snackbarService.showMessage('El registro se ha borrado con éxito')
                        this.findAll();
                    },
                    error:() => {
                        this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
                        this.findAll();
                    }
                });
            },
            reject: () => {
                this.findAll();
            }
        });
    }

}
