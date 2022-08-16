import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OpportunityType } from '../../model/OppurtinityType';
import { OpportunityTypeService } from '../../services/opportunity-type.service';

@Component({
  selector: 'app-opportunity-type-list',
  templateUrl: './opportunity-type-list.component.html',
  styleUrls: ['./opportunity-type-list.component.scss'],
  providers: [ConfirmationService]
})
export class OpportunityTypeListComponent implements OnInit {
  opportunityList: OpportunityType[]
  isLoading: boolean = false
  constructor(private opportunityService: OpportunityTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(){
    this.isLoading = true
    this.opportunityService.findAll().subscribe({
      next: (results) =>{
        this.opportunityList = results
      },
      error: () =>{},
      complete: () => { this.isLoading = false}
    })    
  }

  deleteRow(item: OpportunityType){
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Desea eliminar este elemento?',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cerrar',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () =>{
        this.opportunityService.delete(item.id).subscribe({
          next: (results) =>{
            this.findAll()
            this.showSuccesMessage()
          },
          error: () => {
            this.showErrorMessage()
          }
        });
      },
      reject: () =>{
        this.findAll()
      }
      
  })
    
  }

  showSuccesMessage(): void{
    this.messageService.add({
      key:'opportunityTypeMessage',
      severity:'success', 
      summary:'Confirmado', 
      detail:'El registro se ha borrado con éxito'});
  }

  showErrorMessage(): void{
    this.messageService.add({
      key:'opportunityTypeMessage',
      severity:'error', 
      summary:'Error', 
      detail:'El registro no puede ser eliminado porque se está usando en alguna oferta'});
  }

}
