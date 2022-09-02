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

    public isLoading: boolean = false;

    constructor(
        private sectorService: SectorService,
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
        })
    }
}