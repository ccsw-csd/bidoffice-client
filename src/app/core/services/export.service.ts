import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { OfferDataExportList } from 'src/app/offer/model/OfferDataExportList';
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

  exportOfferDataExport(offers: OfferDataExportList[]) {

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(offers.map(offer => {
        return {
          'Id': offer.id,
          'Cliente': offer.client,
          'Nombre Oportunidad': offer.name,
          'Mas detalle': offer.observations,
          'Sector': offer.sector,
          'Fecha oportunidad': offer.requestedDate,
          'Fecha entrega': offer.deliveryDate,
          'Solicitado por': offer.requestedBy,
          'Tipo oportunidad': offer.opportunityType,
          'Modernización': offer.modernization,
          'End-to-End': offer.endToEnd,
          'DevOps': offer.devops,
          'RPA': offer.rpa,
          'Oficina Proyectos': offer.projectOffice,
          'Lowcode': offer.lowcode,
          'Integración': offer.integrations,
          'Servicios': offer.services,
          'Migración': offer.migration,
          'Software Houses': offer.softwareHouses,
          'Arquitectura': offer.architecture,
          'Tecnología principal': offer.principalTechnology,
          'Más detalle Tecnología': offer.moreTechnology,
          'Cloud': offer.cloud,
          'IA': offer.ia,
          'Agile': offer.agile,
          'Tipo Proyecto': offer.projectType,
          'Importe': offer.amount,
          'FTEs': offer.ftes,
          'Duración': offer.months,
          'Rate-card': offer.rateCard,
          'Presentación Capgemini': offer.presentation,
          'Capacidades': offer.capabilities,
          'Enfoque Solución': offer.approach,
          'Metodología': offer.methodology,
          'Modelo trabajo': offer.workModel,
          'Equipo': offer.team,
          'Planning': offer.planning,
          'Valor Añadido': offer.valueAdded,
          'Innovación': offer.innovation,
          'Sostenibilidad': offer.sostenibility,
          'Referencias': offer.refrence,
          'Lidera C&CA': offer.ccaLeader,
          'Multitower': offer.multitower,
          'Prácticas implicadas': offer.practices,
          'Personas de CSD implicadas': offer.person,
          'Ganada': offer.win,
          'Documento Clave': offer.keyDocument,
          'Referencia comercial': offer.comercialReference,
          'Comentarios': offer.comments
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
