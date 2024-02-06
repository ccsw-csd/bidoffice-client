import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { OfferItemList } from 'src/app/offer/model/OfferItemList';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportOffers(offers: OfferItemList[]) {

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(offers.map(offer => {
        return {
          id: offer.id,
          name: offer.name,
          client: offer.client,
          sector: offer.sector?.name,
          opportunityType: offer.opportunityType?.name,
          genAi: offer.genAi ? 'Sí' : '',
          opportunityStatus: offer.opportunityStatus.name,
          managedBy: offer.managedBy?.name + ' ' + offer.managedBy?.lastname,
          requestedDate: offer.requestedDate,
          deliveryDate: offer.deliveryDate       
        };
      }));
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'offers');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

}
