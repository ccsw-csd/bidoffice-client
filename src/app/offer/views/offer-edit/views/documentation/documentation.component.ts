import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferDataFile } from 'src/app/offer/model/OfferDataFile';
import { OfferService } from 'src/app/offer/services/offer.service';
import { DocumentationEditComponent } from './documentation-edit/documentation-edit.component';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  providers: [ConfirmationService],
})
export class DocumentationComponent implements OnInit {
  isEditing = false;
  fileTypes: BaseClass[];
  clonedDataFile: OfferDataFile;

  @Input() data: Offer;

  constructor(
    private dinamicDialogService: DialogService,
    private offerService: OfferService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
  }

  createFile() {
    const ref = this.dinamicDialogService.open(DocumentationEditComponent, {
      header: 'Crear documento',
      width: '30%',
      data: this.clonedDataFile,
      closable: false,
    });

    ref.onClose.subscribe((dataFile: OfferDataFile) => {
      if (dataFile != null) {
        if (dataFile.id != null) {
          this.data.dataFiles[
            this.data.dataFiles.findIndex((item) => item.id == dataFile.id)
          ] = dataFile;
          
        } else{
          let index = this.data.dataFiles.findIndex((item) => item.uuid == dataFile.uuid);
          if(index != -1)
            this.data.dataFiles[index] = dataFile
          else
            this.data.dataFiles.push(dataFile);
        } 
        delete this.clonedDataFile;
      }
    });
  }

  onRowEditInit(dataFile: OfferDataFile) {
    this.clonedDataFile = { ...dataFile };
    this.createFile();
  }

  onDeleteRow(dataFile: OfferDataFile) {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Esta seguro que desea eliminar este registro?',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-secondary',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        if(dataFile.id != null)
          this.data.dataFiles = this.data.dataFiles.filter(
            (item) => item.id != dataFile.id
          );
        else
          this.data.dataFiles = this.data.dataFiles.filter(
            (item) => item.uuid != dataFile.uuid
          );
      },
      reject: () => {},
    });
  }

  clipText(url: string): string{
    return url.substring(0, 25).concat('...');
  }
}
