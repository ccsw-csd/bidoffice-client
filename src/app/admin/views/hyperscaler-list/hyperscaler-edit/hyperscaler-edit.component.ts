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

  elementHyperscaler: Hyperscaler
  constructor( private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private hyperscalerService: HyperscalerService,
    private messageService: MessageService
    ) { }


  ngOnInit(): void {
    this.elementHyperscaler = Object.assign({hyperscalerData:Hyperscaler},this.config.data.hyperscalerData) ;
    
  }

  saveChanges(element: Hyperscaler){
    console.log(element.name)
    console.log(element.priority)
    this.hyperscalerService.saveHyperscaler(element).subscribe(
      results => { 
        this.close()
      }
    )
  }

  close() {
    
    if (this.ref) {
        this.ref.close();
    }
  }



}
