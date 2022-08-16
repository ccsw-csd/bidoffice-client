import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { FileType } from '../model/FileType';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {
  

  constructor(private http: HttpClient) { }

  getFileTypes(): Observable<FileType[]> {            
    return this.http.get<FileType[]>(environment.server +'/filetype/findAll');
  }

  deleteFileTypeById(fileTypeId: number): Observable<any> {
    return this.http.delete(environment.server+'/filetype/'+fileTypeId);
  }  

  saveFileType(fileType: FileType): Observable<any> {
    let url='/filetype'
    return this.http.put<FileType>(environment.server+url,fileType);
  }

}
