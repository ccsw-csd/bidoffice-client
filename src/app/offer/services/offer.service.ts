import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { environment } from 'src/environments/environment';
import { BaseClass } from '../model/BaseClass';
import { OfferPage } from '../model/OfferPage';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  findPage(pageable: Pageable): Observable<OfferPage>{
    return this.http.post<OfferPage>(environment.server + "/offer/findPage", {pageable:pageable});
  }

  searchClient(filter: string): Observable<string[]>{

    return this.http.get<string[]>(environment.server + "/offer/client/" + filter)
  }

  getAllOffering(): Observable<BaseClass[]>{

    return this.http.get<BaseClass[]>(environment.server + "/offering/findAll")
  }

  getAllTechnologies(): Observable<BaseClass[]>{

    return this.http.get<BaseClass[]>(environment.server + "/technology/findAll")
  }

  getAllOfferTypes(): Observable<BaseClass[]>{

    return this.http.get<BaseClass[]>(environment.server + "/projecttype/findAll")
  }

}
