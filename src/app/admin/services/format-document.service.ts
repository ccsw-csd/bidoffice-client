import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormatDocument } from '../model/FormatDocument';

@Injectable({
  providedIn: 'root'
})
export class FormatDocumentService {

  constructor(private http: HttpClient) { }

  getAllFormatDocument(): Observable<FormatDocument[]>{
    return this.http.get<FormatDocument[]>(environment.server + "/formatdocument/findAll");
  }

  saveFormatDocument(formatDocument: FormatDocument): Observable<FormatDocument>{
    return this.http.put<FormatDocument>(environment.server + "/formatdocument/", formatDocument);
  }

  deleteFormatDocument(id: number): Observable<any>{
    return this.http.delete(environment.server + "/formatdocument/" + id);
  }
}
