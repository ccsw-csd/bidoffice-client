import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
    selector: 'app-technology-edit',
    templateUrl: './technology-edit.component.html',
    styleUrls: ['./technology-edit.component.scss']
})

export class TechnologyEditComponent implements OnInit {

    elementTechnology: Technology;

    constructor(
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private snackbarService: SnackbarService,
        private technologyService: TechnologyService
    ) { }

    ngOnInit(): void {
        this.elementTechnology = Object.assign(
            {technologyData: Technology},
            this.config.data.technologyData
        );
    }

    /**
     * Guarda los datos de una nueva tecnología o los
     * cambios de una tecnología ya existente.
     * 
     * @param technology Tecnología a guardar o modificar.
     */
    saveChanges(technology: Technology) {
        this.technologyService.saveTechnology(technology).subscribe({
            next: () => {
                this.snackbarService.showMessage('El registro se ha guardado con éxito')
                this.close(true);
            },
            error: () => {
                this.snackbarService.error('El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar');
            }
        });
    }

    /**
     * Cierra el cuadro de diálogo.
     */
    close(result: boolean) {
        if (this.ref) {
            this.ref.close(result);
        }
    }
}
