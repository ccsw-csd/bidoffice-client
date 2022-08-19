import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoleClass} from "../model/RoleClass";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<RoleClass[]> {
    return this.http.get<RoleClass[]>(environment.server + "/role/findAll");
  }

}
