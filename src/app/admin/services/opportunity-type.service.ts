import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OpportunityType } from '../model/OppurtinityType';

@Injectable({
  providedIn: 'root'
})
export class OpportunityTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<OpportunityType []>{
    return this.http.get<OpportunityType []>(environment.server + "/opportunitytype/findAll");
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(environment.server + "/opportunitytype/"+ id);
  }

  save(item: OpportunityType): Observable<OpportunityType>{
    return this.http.put<OpportunityType>(environment.server + "/opportunitytype",item)
  }

}
