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
  public checkIfExistsOffers: boolean
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
    let existsOffers: boolean 
    this.hyperscalerService.checkOffers(element.id).subscribe(
      results => {
        existsOffers = results;
        if(existsOffers == false){
          this.confirmationService.confirm({
            message: '¿Desea eliminar este elemento?',
            accept: () => {
              this.hyperscalerService.deleteHyperscaler(element.id).subscribe(
                results => this.ngOnInit()
              );
            },
            reject: () => {
              this.ngOnInit()
            }
          });
        }
        else{
          this.checkIfExistsOffers = existsOffers
          this.msg = [{ severity:'error', 
                      summary:'Error', 
                      detail: element.name+' se encuentra asociado a una oferta'
                    }]
        }
    });
      
    
    

    
  }

}
