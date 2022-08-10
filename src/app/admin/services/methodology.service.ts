import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Methodology } from '../model/Methodology';

@Injectable({
  providedIn: 'root'
})
export class MethodologyService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<BaseClass[]> {
    return this.http.get<BaseClass[]>(environment.server + "/methodology/findAll");
  }

  saveMethodology(methodology: Methodology): Observable<void> {
    let url = 'http://localhost:8080/methodology';
    
    return this.http.put<void>(url, methodology);
  }
  
  delete(id: number): Observable<any>{
    return this.http.delete<any>(environment.server + "/methodology/"+id);
  }
}
