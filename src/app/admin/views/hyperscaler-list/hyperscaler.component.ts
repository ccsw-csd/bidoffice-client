import { Component, Input, OnInit } from '@angular/core';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerService } from '../../services/hyperscaler.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { HyperscalerEditComponent } from '../hyperscaler-edit/hyperscaler-edit.component';


@Component({
  selector: 'app-hyperscaler',
  templateUrl: './hyperscaler.component.html',
  styleUrls: ['./hyperscaler.component.scss'],
  providers: [ConfirmationService,DialogService,DynamicDialogRef,DynamicDialogConfig]
})
export class HyperscalerComponent implements OnInit {
  public listOfData: Hyperscaler[]
  public cols: any[];

  
  constructor(private hyperscalerService: HyperscalerService, 
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getDataHyperscaler()
    
  }

  getDataHyperscaler(): void{
    this.hyperscalerService.getDataHyperscaler().subscribe(
      results => this.listOfData = results
    );
  }

  editHyperscaler(element?: Hyperscaler): void{
    let message: string
      if(element!=null){
        this.ref = this.dialogService.open(HyperscalerEditComponent, {
          header: 'Editar '+element.name,
          width: '40%',
          data: {
            hyperscalerData: element
          },
          closable: false
        }); 
      }
      else{
        this.ref = this.dialogService.open(HyperscalerEditComponent, {
          header: 'Nuevo elemento',
          width: '40%',
          data: {
            },
        });     
    }
    this.onClose(message)
  }

  onClose(message?: string): void{
    let opt: number
    this.ref.onClose.subscribe( 
      (results:any) => {
        this.getDataHyperscaler()   
    });
  }

  showErrorMessage(message?: string): void{
    this.messageService.add({
      key:'hyperscalerMessage',
      severity:'error', 
      summary:'Error', 
      detail:message});
  }
 

  deleteRow(element: Hyperscaler): void{
    let message: string
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Desea eliminar este elemento?',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cerrar',
      accept: () => {
        this.hyperscalerService.deleteHyperscaler(element.id).subscribe({
          next:() => {
            this.getDataHyperscaler()
          },
          error:() => {
            message = "El registro no puede ser eliminado porque se está usando en alguna oferta"
            this.showErrorMessage(message)
            this.getDataHyperscaler()
          } 
        })
      },
      reject: () => {
        this.getDataHyperscaler()
      }
    });
  }
}


