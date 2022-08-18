import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Technology } from '../../model/Technology';
import { TechnologyService } from '../../services/technology.service';

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
        private messageService: MessageService,
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
                this.showSuccessMessage();
                this.close();
            },
            error: () => {
                this.showErrorMessage();
            }
        });
    }

    /**
     * Muestra un mensaje de error.
     */
    showErrorMessage(): void{
        this.messageService.add({
            key:'technologyMessage',
            severity:'error', 
            summary:'Error', 
            detail:'El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar.'
        });
    }

    /**
     * Muestra una confirmación al guardar la tecnología.
     */
    showSuccessMessage(): void{
        this.messageService.add({
            key:'technologyMessage',
            severity:'success', 
            summary:'Confirmado', 
            detail:'El registro se ha guardado con éxito'
        });
    }

    /**
     * Cierra el cuadro de diálogo.
     */
    close() {
        if (this.ref) {
            this.ref.close();
        }
    }
}
