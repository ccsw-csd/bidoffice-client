import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Sector } from '../../model/Sector';
import { SectorService } from '../../services/sector.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss']
})
export class SectorListComponent implements OnInit {

    sectors: Array<Sector>;
    sectorFilteredByDate: Array<Array<Sector>>;
    activeSectors: Array<Sector>;
    inactiveSectors: Array<Sector>;

    toDay: number;
    fechaInicio: number;
    fechaFinal: number;

    public isLoading: boolean = false;

    constructor(
        private sectorService: SectorService,
    ) {  
        this.sectorFilteredByDate = new Array<Array<Sector>>();
        this.activeSectors = new Array<Sector>();
        this.inactiveSectors = new Array<Sector>();
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
                
                for (let i = 0; i < this.sectors.length; i++) {
                    this.toDay = new Date().getTime();
                    var fechaInicio = new Date(this.sectors[i].startDate);
                    var fechaFinal = new Date(this.sectors[i].endDate);

                    this.fechaInicio = fechaInicio.getTime();
                    this.fechaFinal = fechaFinal.getTime();

                    if (this.fechaInicio <= this.toDay && this.toDay <= this.fechaFinal + 8640000) {

                        this.activeSectors.push(this.sectors[i]);
//                        this.sectorFilterDate.get("activo").push(this.sectors[i]);
                    }
                    else {

                        this.inactiveSectors.push(this.sectors[i]);
//                        this.sectorFilterDate.get("inactivo").push(this.sectors[i]);
                    }
                }

                this.sectorFilteredByDate.push(this.activeSectors);
                this.sectorFilteredByDate.push(this.inactiveSectors);
            },
            error:() => {},
            complete: () => {
                this.isLoading = false;
            }
        })
    }
}