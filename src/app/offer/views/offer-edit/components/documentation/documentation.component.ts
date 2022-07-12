import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  documentos: Idoc[];
  constructor() { }

  ngOnInit(): void {
    this.documentos = [
      {docType: 'New', nameDoc: 'Nombre1',url: 'c/User/name', remarks: 'none'},
      {docType: 'Old', nameDoc: 'Nombre2',url: 'c/User2/name', remarks: 'none2'},
      {docType: 'New', nameDoc: 'Nombre3',url: 'c/User3/name', remarks: 'none'},
      {docType: 'Old', nameDoc: 'Nombre4',url: 'c/User4/name', remarks: 'none4'},
      {docType: 'New', nameDoc: 'Nombre5',url: 'c/User5/name', remarks: 'none'}
  ];
  }

}
interface Idoc {
  docType: string,
  nameDoc: string,
  url: string,
  remarks:string,
}