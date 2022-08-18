import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProjectType } from '../model/ProjectType';
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  constructor(private http: HttpClient) { }

  getAll():Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(environment.server + "/projecttype/findAll");
  }

}
