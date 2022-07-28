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
            opt=1
            this.showMessage(opt,element)
            this.getDataHyperscaler()
          },
          error:() => {
            opt=0
            this.showMessage(opt,element)
            this.getDataHyperscaler()
          } 
        })
      },
      reject: () => {
        this.getDataHyperscaler()
      }
    });
  }

  showMessage(opt: number, element: Hyperscaler){
    this.checkIfExistsMessage = true
    if(opt == 0){
      this.msg = [{ 
        severity:'error', 
        summary:'Error', 
        detail: element.name+' se encuentra asociado a una oferta'
    }]
    }
    else{
      this.checkIfExistsMessage = true
            this.msg = [{ 
              severity:'success', 
              summary:'Confirmado', 
              detail: element.name+' se ha eliminado correctamente'
          }]
    }
  }
}


