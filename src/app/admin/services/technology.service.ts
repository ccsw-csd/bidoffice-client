import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Technology } from '../model/Technology';

@Injectable({
  providedIn: 'root'
})

export class TechnologyService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Recupera el listado de tecnologías.
     * 
     * @returns Listado no paginado con las tecnologías.
     */
    findAll(): Observable<Technology[]> {
        
        return this.http.get<Technology[]>(
            environment.server + "/technology/findAll");
    }

    /**
     * Borra una tecnología de la base de datos.
     * 
     * @param elementId Identificador de la tecnología a borrar.
     * 
     * @returns Devuelve si la ha podido borrar correctamente o
     *          una excepción en caso de error.
     */
    deleteTechnology(elementId: number): Observable<any> {
        return this.http.delete(environment.server + "/technology/" + elementId);
    }
}
