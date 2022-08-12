import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferDataFile } from 'src/app/offer/model/OfferDataFile';
import { OfferService } from 'src/app/offer/services/offer.service';
import { DocumentationEditComponent } from './documentation-edit/documentation-edit.component';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  isEditing = false;
  fileTypes: BaseClass[];
  clonedDataFile: OfferDataFile;

  @Input() data: Offer;
  
  constructor(private dinamicDialogService: DialogService, private offerService: OfferService) { }

  ngOnInit(): void {
  }

  createFile(){
    const ref = this.dinamicDialogService.open(DocumentationEditComponent, {
      header: 'Crear documento',
      width: '30%',
      closable: false
    });

    ref.onClose.subscribe((dataFile: OfferDataFile)=>{
      if(dataFile != null)
        this.data.dataFiles.push(dataFile);
    })
  }

  onRowEditInit(dataFile: OfferDataFile){
    this.isEditing = true;
    this.offerService.getAllFileTypes().subscribe({
      next: (res: BaseClass[]) => { 
        this.fileTypes = res;
      },
      error: () => {},
      complete: () => {
        this.clonedDataFile = {...dataFile};
      }      
    });

  }

  onRowEditCancel(index: number) {
    this.data.dataFiles[index] = this.clonedDataFile;
    delete this.clonedDataFile;
    this.isEditing = false;
  }
}
