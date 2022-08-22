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
  templateUrl: './hyperscaler-list.component.html',
  styleUrls: ['./hyperscaler-list.component.scss'],
  providers: [ConfirmationService,DialogService,DynamicDialogRef,DynamicDialogConfig]
})
export class HyperscalerListComponent implements OnInit {
  public listOfData: Hyperscaler[]
  public cols: any[];
  public isLoading: boolean = false

  
  constructor(private hyperscalerService: HyperscalerService, 
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef, 
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getDataHyperscaler()  
  }

  getDataHyperscaler(): void{
    this.isLoading = true
    this.hyperscalerService.getDataHyperscaler().subscribe({
      next: (results:any) => { 
        this.listOfData = results     
      },
      error: () => {
      },
      complete: () =>{
        this.isLoading = false
      }
    });
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
          closable: false
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

  showSuccesMessage(): void{
    this.messageService.add({
      key:'hyperscalerMessage',
      severity:'success', 
      summary:'Confirmado', 
      detail:'El registro se ha borrado con éxito'});
  }

  showErrorMessage(): void{
    this.messageService.add({
      key:'hyperscalerMessage',
      severity:'error', 
      summary:'Error', 
      detail:'El registro no puede ser eliminado porque se está usando en alguna oferta'});
  }

  deleteRow(element: Hyperscaler): void{
    this.confirmationService.confirm({
      header: '¡ Atención !',
      message: 'Si borra el hyperscaler, se eliminarán los datos del mismo.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
      acceptLabel: 'Aceptar',
      acceptIcon: 'ui-icon-blank',
      rejectLabel: 'Cerrar',
      rejectIcon: 'ui-icon-blank',
      rejectButtonStyleClass: 'p-button-secondary',
      
      accept: () => {
        this.hyperscalerService.deleteHyperscaler(element.id).subscribe({
          next:() => {
            this.showSuccesMessage()
            this.getDataHyperscaler()
          },
          error:() => {
            this.showErrorMessage()
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


