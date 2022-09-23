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
  item: OpportunityType;
  isDeleted: boolean;
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

  showDialog(element?: OpportunityType){   
    this.item=element 
    this.snackbarService.showConfirmDialog()
  }

  changeFlagForDelete(){
    this.isDeleted = true
    this.deleteRow(this.item)
  }

  closeDialog(){
    this.snackbarService.closeConfirmDialog()
    if(this.isDeleted==false){
      this.findAll()
    }
  }

  deleteRow(item: OpportunityType){
    this.opportunityService.delete(item.id).subscribe({
      next: (results) =>{
        this.snackbarService.showMessage('El registro se ha borrado con éxito')
      },
      error: () => {
        this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');  
        this.closeDialog()    
      },
      complete: () =>{
        this.isDeleted = false
        this.closeDialog()
      }
    });
  }

  editItem(item?: OpportunityType){

    let headerChoice;
    let dataChoice;

    if (item != null) {
        headerChoice = 'Editar ' + item.name;
        dataChoice = item
    }
    else {
        headerChoice = 'Nuevo tipo de oportunidad';
        dataChoice = new OpportunityType();
    }

    this.ref = this.dialogService.open(OpportunityTypeEditComponent,{
    header: headerChoice,
        width: '40%',
        data: {
            opportunityData: dataChoice
        },
        closable: false
    });
     
    this.onClose()
  }

  onClose(): void{
    this.ref.onClose.subscribe( 
      (results:boolean) => {
        if (results) this.findAll();
    });
  }
}
