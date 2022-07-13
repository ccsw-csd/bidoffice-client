import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FileType } from '../file-type/model/FileType';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { 

  }

  getFileTypes(): Observable<FileType[]> {            
    return this.http.get<FileType[]>('http://localhost:8080/admin/filetype');
}

}
