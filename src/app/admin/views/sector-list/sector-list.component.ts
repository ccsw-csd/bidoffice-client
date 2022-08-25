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

    sectors: Sector[];
    sectorFilterDate = new Map();
    toDay = new Date();
    fechaInicio: Date;
    fechaFinal: Date;

    public isLoading: boolean = false;

    constructor(
        private sectorService: SectorService,
    ) {  }

    ngOnInit(): void {
        this.sectorFilterDate.set("activo", []);
        this.sectorFilterDate.set("inactivo", []);
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
                    this.fechaInicio = this.sectors[i].startDate;
                    this.fechaFinal = this.sectors[i].endDate;

                    if (this.toDay >= this.fechaInicio && this.toDay <= this.fechaFinal){

                        this.sectorFilterDate.get("activo").push(this.sectors[i]);
                    }
                    else {

                        this.sectorFilterDate.get("inactivo").push(this.sectors[i]);
                    }
                }

            },
            error:() => {},
            complete: () => {
                this.isLoading = false;
            }
        })
    }
}