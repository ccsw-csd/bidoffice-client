import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Sector } from '../../model/Sector';
import { SectorService } from '../../services/sector.service';

@Component({
  selector: 'app-sector-edit',
  templateUrl: './sector-edit.component.html',
  styleUrls: ['./sector-edit.component.scss']
})

export class SectorEditComponent implements OnInit {

    sector: Sector;

    constructor(
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private snackbarService: SnackbarService,
        private sectorService: SectorService
    ) { }

    ngOnInit(): void {
        this.sector = new Sector(this.config.data.sectorData);

        if (this.sector == null) {

            this.sector = new Sector();
        }
    }

    /**
     * Guarda los datos de una nuevo sector o los
     * cambios de sector ya existente ya existente.
     * 
     * @param sector Tecnología a guardar o modificar.
     */
     saveChanges(sector: Sector) {
        this.sectorService.saveSector(sector).subscribe({
            next: () => {
                this.snackbarService.showMessage('El registro se ha guardado con éxito')
                this.close();
            },
            error: (returnResponse: HttpErrorResponse) => {
                this.snackbarService.error(returnResponse.message);
            }
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