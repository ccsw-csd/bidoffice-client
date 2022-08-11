import { Component, OnInit } from '@angular/core';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-technology-list',
    templateUrl: './technology-list.component.html',
    styleUrls: ['./technology-list.component.scss'],
    providers: [ConfirmationService, MessageService]
})

export class TechnologyListComponent implements OnInit {

    technologies: Technology[];

    constructor(
        private technologyService: TechnologyService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.findAll();
    }

    /**
     * Recupera el listado de tecnologías del servicio
     * y los carga en el vector.
     */
    findAll() {
        this.technologyService.findAll().subscribe(
            results => this.technologies = results
        );
    }

    /**
     * Borra una tecnología de la base de datos.
     * 
     * @param technology Tecnología a borrar.
     */
    deleteTechnology(technology: Technology) {

        this.confirmationService.confirm({
            header: "¡ Atención !",
            message: 'Si borra la tecnología, se eliminarán los datos de la misma.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            key: "techDeleteDialog",
            accept: () => {
                this.technologyService.deleteTechnology(technology.id).subscribe({
                    next: () => {
                        this.findAll();
                    },
                    error:() => {
                        this.showMessageError(
                            'deleteError',
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
     * Muestra un mensaje de error.
     * 
     * @param _key Tipo de error.
     * @param _severity Severidad del error.
     * @param _summary 
     * @param _detail Mensaje de error a mostrar.
     */
    showMessageError(_key: string, _severity: string, _summary: string, _detail: string) {

        this.messageService.add({
            key: _key,
            severity: _severity,
            summary: _summary,
            detail: _detail
        });
    }
}
