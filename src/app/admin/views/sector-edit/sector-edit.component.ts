import { Component, OnInit } from '@angular/core';
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
        this.sector = Object.assign(
            {sectorData: Sector},
            this.config.data.sectorData
        );
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