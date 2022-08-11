import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { MethodologyService } from '../../services/methodology.service';
import {ConfirmationService, MessageService} from 'primeng/api';


@Component({
  selector: 'app-methodology-list',
  templateUrl: './methodology-list.component.html',
  styleUrls: ['./methodology-list.component.scss'],
  providers: [ConfirmationService]
})
export class MethodologyListComponent implements OnInit {

  methodologyItemList: Methodology[];

  constructor(
    private methodologyService: MethodologyService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.methodologyService.findAll().subscribe({
        next: (res: Methodology[]) => { 
          this.methodologyItemList = res;
        },
        error: () => {},
        complete: () => {}
    });
  }

  deleteItem(methodologyItem?: Methodology){
    this.confirmationService.confirm({   
      message: '¿Desea eliminar este elemento?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cerrar',
      accept: () => {
        this.methodologyService.delete(methodologyItem.id).subscribe({
          next:() => {  
            this.findAll()
          },
          error:() => {
            this.showMessage()
            this.findAll()
          },
          complete: () => {} 
        })
      },
      reject: () => {
        this.findAll()
      }
    });
  }

  showMessage(){
    this.messageService.add({
      key: 'methodologyMessage',
      severity:'error', 
      summary:'Error', 
      detail:'El registro no puede ser eliminado porque se está usando en alguna oferta'});
  }

}
