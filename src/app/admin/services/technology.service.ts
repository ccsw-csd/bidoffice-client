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
     * @returns 
     */
    findAll(): Observable<Technology[]> {
        
        return this.http.get<Technology[]>(
            environment.server + "/technology/findAll");
    }

    /**
     * Borra una tecnología.
     * 
     * @param id Identificador de la tecnología a borrar.
     * 
     * @returns Devuelve si ha conseguido borrar la tecnología
     *          o un indicador de error.
     */
    deleteTechnology(id: number): Observable<any> {
        return this.http.delete<any>(environment.server + "/technology/" + id);
    }

}
