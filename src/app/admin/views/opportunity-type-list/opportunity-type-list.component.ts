import { Component, OnInit } from '@angular/core';

import { OpportunityType } from '../../model/OppurtinityType';
import { OpportunityTypeService } from '../../services/opportunity-type.service';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { OpportunityTypeEditComponent } from '../opportunity-type-edit/opportunity-type-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-opportunity-type-list',
  templateUrl: './opportunity-type-list.component.html',
  styleUrls: ['./opportunity-type-list.component.scss'],
  providers: [DialogService,DynamicDialogRef,DynamicDialogConfig]
})
export class OpportunityTypeListComponent implements OnInit {
  opportunityList: OpportunityType[]
  isLoading: boolean = false
  constructor(private opportunityService: OpportunityTypeService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    ) { }

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

  showDialog(){  
    this.snackbarService.showConfirmDialog()
  }

  cancel(){
    this.findAll()
  }

  deleteRow(item: OpportunityType){
    this.opportunityService.delete(item.id).subscribe({
      next: (results) =>{
        this.findAll()
        this.snackbarService.showMessage('El registro se ha borrado con éxito')
      },
      error: () => {
        this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');      
      }
    });
  }

  editItem(item?: OpportunityType){
    if(item!=null){
      this.ref = this.dialogService.open(OpportunityTypeEditComponent,{
        header: 'Editar '+ item.name,
          width: '40%',
          data: {
            opportunityData: item
          },
          closable: false
      });
     
    }
    else{
      this.ref = this.dialogService.open(OpportunityTypeEditComponent,{
        header: 'Nuevo elemento',
          width: '40%',
          data: {
          },
          closable: false
      });
    } 
    this.onClose()
  }

  onClose(): void{
    this.ref.onClose.subscribe( 
      (results:any) => {
        this.findAll()  
    });
  }

}
