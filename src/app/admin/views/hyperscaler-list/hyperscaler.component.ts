import { Component, Input, OnInit } from '@angular/core';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerService } from '../../services/hyperscaler.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { HyperscalerEditComponent } from './hyperscaler-edit/hyperscaler-edit.component';

@Component({
  selector: 'app-hyperscaler',
  templateUrl: './hyperscaler.component.html',
  styleUrls: ['./hyperscaler.component.scss'],
  providers: [ConfirmationService,DialogService,DynamicDialogRef,DynamicDialogConfig]
})
export class HyperscalerComponent implements OnInit {
  public listOfData: Hyperscaler[]
  public cols: any[];
  public checkIfExistsMessage: boolean
  public msg: Message[]
  

  
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
        message = "Se ha creado un nuevo elemento"
        
    }
    this.onClose(message)
  }

  onClose(message?: string): void{
    let opt: number
    this.ref.onClose.subscribe( 
      (results:any) => {
        //if(results!=false)
          //this.showSuccessMessage(message)    
    });
  }

  showSuccessMessage(message?: string): void{
    this.messageService.add({
      key:'hyperscalerMessage',
      severity:'success', 
      summary:'Confirmado', 
      detail:message});  
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
      accept: () => {
        this.hyperscalerService.deleteHyperscaler(element.id).subscribe({
          next:() => {
           // message = "Se ha eliminado "+element.name+" correctamente"
           // this.showSuccessMessage(message)
            this.getDataHyperscaler()
          },
          error:() => {
            message = "No se ha podido eliminar "+element.name
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


