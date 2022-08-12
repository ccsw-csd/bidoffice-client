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
  existsPriority: boolean
  fieldsNull: boolean
  outOfRange: boolean
  elementHyperscaler: Hyperscaler
  elementBeforeChanges: Hyperscaler

  constructor( private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private hyperscalerService: HyperscalerService,
    ) { }


  ngOnInit(): void {
    this.elementHyperscaler = Object.assign({hyperscalerData:Hyperscaler},this.config.data.hyperscalerData);
  }

  saveChanges(element: Hyperscaler){
    if(element.priority < 1 && element.priority!=null){
      this.fieldsNull = false
      this.existsPriority = false
      this.outOfRange = true
    }
    else if(element.name=="" || element.name==null || element.priority==null ){
      this.fieldsNull = true
      this.existsPriority = false
      this.outOfRange = false
    }
    else{
      this.hyperscalerService.saveHyperscaler(element).subscribe({
        next: () => { 
          this.existsPriority = false
          this.fieldsNull = false
          this.outOfRange = false
          this.close()
        },
        error: () => {
          this.existsPriority = true;
          this.fieldsNull = false;
          this.outOfRange = false
        }
      })
    }
  }

  close() {
    if(this.ref) {
        this.ref.close();
    }
  }

}
