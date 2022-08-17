import { Component, OnInit } from '@angular/core';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TechnologyEditComponent } from '../technology-edit/technology-edit.component';

@Component({
    selector: 'app-technology-list',
    templateUrl: './technology-list.component.html',
    styleUrls: ['./technology-list.component.scss'],
    providers: [ConfirmationService, MessageService, DynamicDialogRef, DynamicDialogConfig, DialogService]
})

export class TechnologyListComponent implements OnInit {

    technologies: Technology[];
    public isLoading: boolean = false;

    constructor(
        private technologyService: TechnologyService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private dialogService: DialogService,
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
                header: 'Editar tecnología: ' + technology.name,
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
            message: 'Si borra la tecnología, no se podrá utilizar en ninguna oferta.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            key: "techDeleteDialog",
            accept: () => {
                this.technologyService.deleteTechnology(technology.id).subscribe({
                    next: () => {
                        this.showMessage(
                            'technologyMessage',
                            'success',
                            'Confirmado',
                            'El registro se ha borrado con éxito.'
                        );
                        this.findAll();
                    },
                    error:() => {
                        this.showMessage(
                            'technologyMessage',
                            'error',
                            'ERROR',
                            'No es posible eliminar una tecnología utilizada en al menos una oferta.'
                        );
                        this.findAll();
                    }
                });
            },
            reject: () => {
                this.findAll();
            }
        });
    }

    /**
     * Muestra un mensaje de error o de éxito.
     * 
     * @param _key Tipo de error.
     * @param _severity Severidad del error.
     * @param _summary 
     * @param _detail Mensaje de error a mostrar.
     */
    showMessage(_key: string, _severity: string, _summary: string, _detail: string) {

        this.messageService.add({
            key: _key,
            severity: _severity,
            summary: _summary,
            detail: _detail
        });
    }
}
