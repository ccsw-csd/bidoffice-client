import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Offer } from 'src/app/offer/model/Offer';

@Component({
  selector: 'app-option-status',
  templateUrl: './option-status.component.html',
  styleUrls: ['./option-status.component.scss']
})
export class OptionStatusComponent implements OnInit {
  readonly labelInProgress: string = 'En curso';
  readonly labelInGoNoGo: string = 'Pendiente Go/NoGo';
  readonly labelInReject: string = 'Desestimada';
  readonly labelInStandBy: string = 'Stand by';
  readonly labelInDelivered: string = 'Entregada';
  readonly labelInFinish: string = 'Finalizada';
  win: string[] = ['Ganada', 'Perdida'];

  @Input() data: FormGroup;
  @Input() offer: Offer;
  @Input() selectedOptionStatus: BaseClass;
  
  constructor() { }

  ngOnInit(): void {
    this.offer = new Offer();
    this.selectedOptionStatus = new BaseClass();
  }

  isEqual(selectedStatus: string, optionStatus): boolean{
    return selectedStatus == optionStatus;
  }
}
