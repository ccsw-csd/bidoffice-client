import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FileType } from '../file-type/model/FileType';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {

  constructor(private http: HttpClient) { 

  }

  getFileTypes(): Observable<FileType[]> {            
    return this.http.get<FileType[]>('http://localhost:8080/filetype');
}

}
