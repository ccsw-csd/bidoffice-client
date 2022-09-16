import { NodeWithI18n, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Sector } from '../../model/Sector';
import { SectorService } from '../../services/sector.service';
import { SectorEditComponent } from '../sector-edit/sector-edit.component';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss'],
  providers: [ DynamicDialogRef, DialogService]
})
export class SectorListComponent implements OnInit {

    sectors: Array<Sector>;
    sector: Sector;
    public isLoading: boolean = false;
    isDeleted: boolean = false;
    
    constructor(
        private sectorService: SectorService,
        private snackBarService: SnackbarService,
        private ref: DynamicDialogRef,
        private dialogService: DialogService,
    ) {
     }

    ngOnInit(): void {
        this.findAll();
    }

    /**
     * Recupera el listado de sectores del servicio
     * y los carga en el vector.
     */
    findAll() {
        this.isLoading = true;
        this.sectorService.findAll().subscribe({
            next: (results:any) => {
                this.sectors = results;
                
            },
            error:() => {},
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    /**
     * Muestra un cuadro de confirmación antes de borrar
     * un sector.
     * 
     * @param sector Sector a eliminar.
     */
    showDeleteDialog(sector?: Sector) {
        this.sector = sector;
        this.snackBarService.showConfirmDialog();
    }

    /**
     * Cierra el cuadro de confirmación sin realizar
     * ninguna acción.
     */
    closeDialog() {
        this.snackBarService.closeConfirmDialog();
    }

    /**
     * Cierra el cuadro de confirmación, intentando
     * borrar posteriormente el sector implicado.
     */
    confirmDeletion() {
        this.snackBarService.closeConfirmDialog();
        this.deleteSector(this.sector);
    }

    /**
     * Borra un sector de la base de datos.
     * 
     * @param sector Sector a borrar.
     */
    deleteSector(sector: Sector) {
        this.sectorService.deleteSector(sector.id).subscribe({
            next: () => {
                this.snackBarService.showMessage('El registro se ha borrado con éxito');
            },
            error:() => {
                this.snackBarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
            },
            complete:() =>{
                this.findAll();
            }
        });
    }

    /**
     * Guarda los datos de un nuevo sector o
     * modifica los de un sector ya existente.
     * 
     * @param sector Sector a editar o modificar.
     */
    editSector(sector?: Sector): void {

        let headerChoice;
        let dataChoice;

        if (sector != null) {
            headerChoice = 'Editar ' + sector.name;
            dataChoice = sector;
        }
        else {
            headerChoice = 'Nuevo sector';
            dataChoice = new Sector();
        }
        
        this.ref = this.dialogService.open(SectorEditComponent, {
            header: headerChoice,
            width: '40%',
            data: {
                sectorData: dataChoice,
            },
            closable: false
        });

        this.ref.onClose.subscribe ((result: boolean) => {
           
            if (result) {
                this.findAll();
            }
        });
    }
}