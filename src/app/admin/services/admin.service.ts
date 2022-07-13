import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hyperscaler } from '../model/Hyperscaler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDataHyperscale():Observable<Hyperscaler[]>{
    let url = "http://localhost:8080/admin/hyperscaler";

    return this.http.get<Hyperscaler[]>(url);
  }
}
