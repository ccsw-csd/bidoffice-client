import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { environment } from 'src/environments/environment';
import { BaseClass } from '../model/BaseClass';
import { Offer } from '../model/Offer';
import { OfferPage } from '../model/OfferPage';
import { Person } from '../model/Person';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  findPage(pageable: Pageable): Observable<OfferPage> {
    return this.http.post<OfferPage>(environment.server + "/offer/findPage", { pageable: pageable });
  }

  searchClient(filter: string): Observable<string[]> {

    return this.http.get<string[]>(environment.server + "/offer/client/" + filter)
  }

  getAllOffering(): Observable<BaseClass[]> {

    return this.http.get<BaseClass[]>(environment.server + "/offering/findAll")
  }

  getAllTechnologies(): Observable<BaseClass[]> {

    return this.http.get<BaseClass[]>(environment.server + "/technology/findAll")
  }

  getAllOfferTypes(): Observable<BaseClass[]> {

    return this.http.get<BaseClass[]>(environment.server + "/opportunitytype/findAll")
  }

  getAllSectors(): Observable<BaseClass[]> {

    return this.http.get<BaseClass[]>(environment.server + "/sector/findAll")
  }

  getAllProjectTypes() {

    return this.http.get<BaseClass[]>(environment.server + "/projecttype/findAll")
  }

  getAllMethodologies() {

    return this.http.get<BaseClass[]>(environment.server + "/methodology/findAll")
  }

  getAllHyperscalers() {

    return this.http.get<BaseClass[]>(environment.server + "/hyperscaler/findAll")
  }

  searchPerson(filter: string): Observable<Person[]> {

    return this.http.get<Person[]>(environment.server + "/person/" + filter)
  }

  getAllFileTypes(): Observable<BaseClass[]> {

    return this.http.get<BaseClass[]>(environment.server + "/filetype/findAll");
  }

  getAllOfferStatus(): Observable<BaseClass[]> {

    return this.http.get<BaseClass[]>(environment.server + "/opportunityStatus/findAll")
  }

  getOffer(id: number): Observable<Offer> {
    return this.http.get<Offer>(environment.server + "/offer/" + id);
  }

  save(offer: Offer): Observable<Offer>{

    return this.http.put<Offer>(environment.server + "/offer/", offer);
  }

}
