import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferTracing } from 'src/app/offer/model/OfferTracing';

@Component({
  selector: 'app-option-status',
  templateUrl: './option-status.component.html',
  styleUrls: ['./option-status.component.scss'],
})
export class OptionStatusComponent implements OnInit {
  readonly labelInProgress: string = 'En curso';
  readonly labelInGoNoGo: string = 'Pendiente Go/NoGo';
  readonly labelInReject: string = 'Desestimada';
  readonly labelInStandBy: string = 'Stand by';
  readonly labelInDelivered: string = 'Entregada';
  readonly labelInFinish: string = 'Finalizada';
  winOpion: string[] = ['Ganada', 'Perdida'];

  @Input() form: FormGroup;
  @Input() offer: Offer;
  @Input() selectedOptionStatus: BaseClass;
  @Input() tracing: OfferTracing;
  @Input() dateGoNoGo: Date;
  @Input() dateDelivered: Date;
  @Input() win: boolean;

  constructor() { }

  ngOnInit(): void {
    this.offer = new Offer();
    this.selectedOptionStatus = new BaseClass();
  }

  isEqual(
    selectedStatus: string,
    optionStatus,
    formControlName: string
  ): boolean {
    if (selectedStatus == optionStatus) {
      if (formControlName != null) this.disabledValidation(formControlName);
      return true;
    }
    return false;
  }

  requiredComent(formControlName: string) {
    if (
      this.offer.opportunityStatus.name == this.labelInGoNoGo &&
      this.selectedOptionStatus.name == this.labelInProgress
    ) {
      return false;
    }
    if (this.selectedOptionStatus.name == this.labelInDelivered) {
      return false;
    }
    if (this.offer.opportunityStatus.name == this.labelInDelivered) {
      return false;
    }
    this.disabledValidation(formControlName);
    return true;
  }

  private disabledValidation(formControlName: string) {
    Object.keys(this.form.controls).forEach((control) =>
      this.disabledControlValidation(control, formControlName)
    );
  }
  private disabledControlValidation(control: string, formControlName: string) {
    if (control != formControlName) {
      this.form.controls[control].disable();
    } else this.form.controls[formControlName].enable();
  }
}
