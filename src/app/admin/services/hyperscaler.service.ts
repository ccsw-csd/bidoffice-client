import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hyperscaler } from '../model/Hyperscaler';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HyperscalerService {

  constructor(private http: HttpClient) { }

  getDataHyperscaler():Observable<Hyperscaler[]>{
    return this.http.get<Hyperscaler[]>(environment.server + "/hyperscaler/findAll");
  }

  deleteHyperscaler(elementId: number):Observable<any>{
    return this.http.delete(environment.server + "/hyperscaler/"+elementId)
  }

  saveHyperscaler(element: Hyperscaler):Observable<Hyperscaler>{
    let url = environment.server+"/hyperscaler"     
    return this.http.put<Hyperscaler>(url,element)
  }
}
