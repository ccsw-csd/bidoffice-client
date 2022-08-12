import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Offer } from '../../model/Offer';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfferEditComponent implements OnInit {
  activeItem: number = 0;
  offer: Offer; 
  offerForm: FormGroup;
  chanceForm: FormGroup
  constructor(private formBuilder : FormBuilder, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    
    if(this.config.data != null)
      this.offer = this.config.data
    else
      this.offer = new Offer();

    this.offerForm = this.formBuilder.group
    ({
      chance: this.formBuilder.group({
        nameOpportunity: ['', Validators.required],
        client: ['', Validators.required],
        state: ['', Validators.required],
        requestedBy: [''],
        managedBy: [''],
        requestedDate: ['', Validators.required],
        sector: ['', Validators.required],
        dataProject: [''],
        offerings: [''],
        technologies: [''],
        opportunityType: ['', Validators.required],
        goNogoDate: [''],
        deliveryDate: ['', Validators.required],
        bdcCode: ['', Validators.required],
        opportunityWin: ['', Validators.required],
        observations: ['', Validators.required],
      }),

      planandproyect: this.formBuilder.group({
        cca: [''],
        multitower: [''],
        practices: [''],
        teamPerson: ['', Validators.required],
        dataTechnologyHyperscaler: [''],
        dataTechnologyMethodolog: [''],
        dataProjectAmount: [''],
        dataProjectFtes: [''],
        dataProjectMonths: [''],
        dataTechnologyObservation: ['']
      })
    });
  }

  onSave(){
    if(this.offerForm.valid){
    }
    else{
      Object.keys(this.offerForm.controls).forEach(control => this.offerForm.controls[control].markAsDirty());
      this.offerForm.markAllAsTouched();
    }

  }

}
