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

  getDataHyperscale():Observable<Hyperscaler[]>{
    return this.http.get<Hyperscaler[]>(environment.server + "/hyperscaler/findAll");
  }
}
