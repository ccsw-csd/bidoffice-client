import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Offer } from 'src/app/offer/model/Offer';
import { environment } from 'src/environments/environment';
import { FileType } from '../model/FileType';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {

  constructor(private http: HttpClient) { 

  }

  getFileTypes(): Observable<FileType[]> {            
    return this.http.get<FileType[]>(environment.server +'/filetype/findAll');
  }

  deleteFileTypeById(fileType: FileType): Observable<any> {
    return this.http.delete(environment.server+'/filetype/'+fileType.id);
  }  

  checkOffers(id: number): Observable<any>{
    //console.log("ASDF", this.http.get<boolean>(environment.server +'/filetype/checkOffers/'+id))
    this.http.get<boolean>(environment.server +'/filetype/checkOffers/'+id).forEach(x=> console.log("Asdf",x))

    return this.http.get<any>(environment.server +'/filetype/checkOffers/'+id);
  }

}
