import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserPage } from "../model/UserPage";
import { Pageable } from "../../core/models/Pageable";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(pageable: Pageable, username:String, name:String): Observable<UserPage>{
    return this.http.post<UserPage>(environment.server + "/user/findPage", {pageable:pageable, username:username, name:name});
  }

}