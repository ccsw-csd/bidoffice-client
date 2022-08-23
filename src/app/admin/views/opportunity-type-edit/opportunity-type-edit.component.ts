import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OpportunityType } from '../../model/OppurtinityType';
import { OpportunityTypeService } from '../../services/opportunity-type.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-opportunity-type-edit',
  templateUrl: './opportunity-type-edit.component.html',
  styleUrls: ['./opportunity-type-edit.component.scss']
})
export class OpportunityTypeEditComponent implements OnInit {

  opportunityElement: OpportunityType

  constructor(
    private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private opportunityService: OpportunityTypeService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.opportunityElement = Object.assign({opportunityData: OpportunityType},this.config.data.opportunityData);
  }

  saveItem(item: OpportunityType){
    this.opportunityService.save(item).subscribe({
      next: () =>{
        this.snackbarService.showMessage('El registro se ha guardado con éxito')
        this.closeWindow()
      },
      error: () =>{
        this.snackbarService.error('El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar'); 
      }
    })
  }

  closeWindow() {
    if(this.ref) {
        this.ref.close();
    }
  }
}
