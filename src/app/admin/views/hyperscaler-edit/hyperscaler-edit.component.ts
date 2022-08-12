import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { Hyperscaler } from 'src/app/admin/model/Hyperscaler';
import { HyperscalerService } from 'src/app/admin/services/hyperscaler.service';


@Component({
  selector: 'app-hyperscaler-edit',
  templateUrl: './hyperscaler-edit.component.html',
  styleUrls: ['./hyperscaler-edit.component.scss']
})
export class HyperscalerEditComponent implements OnInit {
  isLoading: boolean = false
  elementHyperscaler: Hyperscaler

  constructor( private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private hyperscalerService: HyperscalerService,
    private messageService: MessageService
    ) { }


  ngOnInit(): void {
    this.elementHyperscaler = Object.assign({hyperscalerData:Hyperscaler},this.config.data.hyperscalerData);
  }

  saveChanges(element: Hyperscaler){
      this.hyperscalerService.saveHyperscaler(element).subscribe({
        next: () => { 
          this.showSuccesMessage()    
          this.close()  
        },
        error: () => {
          this.showErrorMessage()
        }
      })  
  }

  showErrorMessage(): void{
    this.messageService.add({
      key:'hyperscalerMessage',
      severity:'error', 
      summary:'Error', 
      detail:'El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar'});
  }

  showSuccesMessage(): void{
    this.messageService.add({
      key:'hyperscalerMessage',
      severity:'success', 
      summary:'Confirmado', 
      detail:'El registro se ha guardado con éxito'});
  }


  close() {
    if(this.ref) {
        this.ref.close();
    }
  }

}
