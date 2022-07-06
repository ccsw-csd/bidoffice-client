import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { environment } from 'src/environments/environment';
import { OfferPage } from '../model/OfferPage';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  findPage(pageable: Pageable): Observable<OfferPage>{
    return this.http.post<OfferPage>(environment.server + "/offer/findPage", {pageable:pageable});
  }
}
