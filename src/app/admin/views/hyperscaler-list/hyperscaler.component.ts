import { Component, Input, OnInit } from '@angular/core';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerService } from '../../services/hyperscaler.service';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';


@Component({
  selector: 'app-hyperscaler',
  templateUrl: './hyperscaler.component.html',
  styleUrls: ['./hyperscaler.component.scss'],
  providers: [ConfirmationService]
})
export class HyperscalerComponent implements OnInit {
  public listOfData: Hyperscaler[]
  public cols: any[];
  public checkIfExistsMessage: boolean
  public msg: Message[]
  

  
  constructor(private hyperscalerService: HyperscalerService, 
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    this.getDataHyperscaler()
    
  }

  getDataHyperscaler(): void{
    this.hyperscalerService.getDataHyperscaler().subscribe(
      results => this.listOfData = results
    );
  }

  deleteRow(element: Hyperscaler): void{
    let opt: number
    this.confirmationService.confirm({
      message: '¿Desea eliminar este elemento?',
      accept: () => {
        this.hyperscalerService.deleteHyperscaler(element.id).subscribe({
          next:() => {
            
            this.getDataHyperscaler()
          },
          error:() => {
            
            this.getDataHyperscaler()
          } 
        })
      },
      reject: () => {
        this.getDataHyperscaler()
      }
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
}


