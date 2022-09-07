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
}
