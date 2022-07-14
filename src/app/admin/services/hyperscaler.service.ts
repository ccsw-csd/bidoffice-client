import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hyperscaler } from '../model/Hyperscaler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HyperscalerService {

  constructor(private http: HttpClient) { }

  getDataHyperscale():Observable<Hyperscaler[]>{
    let url = "http://localhost:8080/hyperscaler";

    return this.http.get<Hyperscaler[]>(url);
  }
}
