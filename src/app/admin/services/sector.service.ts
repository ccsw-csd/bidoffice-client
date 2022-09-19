import { Injectable } from '@angular/core';
import { Sector } from '../model/Sector';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Recupera el listado de sectores.
     */
    findAll(): Observable<Sector[]> {
        
        return this.http.get<Sector[]>(
            environment.server + "/sector/findAll");
    }

    /**
     * Borra un sector.
     * 
     * @param id Identificador del sector a borrar.
     * @returns Devuelve si ha conseguido borrar el sector o
     *          un indicador de error.
     */
    deleteSector(id: number): Observable<any> {
        return this.http.delete<any>(environment.server + "/sector/" + id);
    }

    /**
     * Guarda un sector nuevo o modifica
     * uno ya existente.
     * 
     * @param sector Tecnología a guardar.
     * @returns 
     */
    saveSector(sector: Sector):Observable<void> {
        let url = environment.server + "/sector";

        if (sector.startDate != null){

            sector.startDate = new Date(Date.UTC(sector.startDate.getFullYear(),
                                             sector.startDate.getMonth(),
                                             sector.startDate.getDate()));
        }

        if (sector.endDate != null) {
        
            sector.endDate = new Date(Date.UTC(sector.endDate.getFullYear(),
                                             sector.endDate.getMonth(),
                                             sector.endDate.getDate()));
        }

        return this.http.put<void>(url, sector);
    }
}
