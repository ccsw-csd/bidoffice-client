import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offering } from '../model/Offering';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Offering[]> {
    return this.http.get<Offering[]>(environment.server + "/offering/findAll");
  }

  saveOffering(offering: Offering):Observable<Offering> {
    return this.http.put<Offering>(environment.server + "/offering", offering);
  }
  
  deleteOffering(id: number):Observable<any> {
    return this.http.delete<Offering[]>(environment.server + "/offering/" + id);
  }
}
