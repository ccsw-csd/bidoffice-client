import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferTradeTracking } from 'src/app/offer/model/OfferTradeTracking';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tradetrack-edit',
  templateUrl: './tradetrack-edit.component.html',
  styleUrls: ['./tradetrack-edit.component.scss'],
})
export class TradetrackEditComponent implements OnInit {
  tradeForm: FormGroup;
  currentDateTime;
  personCourrent: string = '';
  offerTradeTracking: OfferTradeTracking = new OfferTradeTracking();

  constructor(
    private offerService: OfferService,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data != null) {
      this.offerTradeTracking = this.config.data;
      this.mappingPerson(this.offerTradeTracking.person);
    } else {
      this.offerTradeTracking.uuid = uuidv4();
      this.currentDateTime = setInterval(() => {
        this.offerTradeTracking.date = new Date();
      }, 1000);
      this.searchPerson(this.auth.getUserInfo().username);
    }

    this.tradeForm = this.formBuilder.group({
      person: [{ value: '', disabled: true }, Validators.required],
      comment: ['', Validators.required],
      date: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnDestroy() {
    clearInterval(this.currentDateTime);
  }

  onSave() {
    if (!this.tradeForm.invalid) {
      this.ref.close(this.offerTradeTracking);
    } else {
      Object.keys(this.tradeForm.controls).forEach((control) =>
        this.tradeForm.controls[control].markAsDirty()
      );
      this.tradeForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.ref.close();
  }

  searchPerson(searchPeron: string) {
    this.offerService.searchPerson(searchPeron).subscribe({
      next: (res: Person[]) => {
        this.personCourrent = this.mappingPerson(
          res.find((item) => item.username == this.auth.getUserInfo().username)
        ).field;
        this.offerTradeTracking.date = new Date();
      },
      error: () => {},
      complete: () => {},
    });
  }

  mappingPerson(person: Person): any {
    this.offerTradeTracking.person = person;
    return {
      field: person.name + ' ' + person.lastname + ' - ' + person.username,
      value: person,
    };
  }

  checkValidation(control: string): boolean {
    if (
      this.tradeForm.get(control).invalid &&
      this.tradeForm.get(control).touched
    ) {
      this.tradeForm.controls[control].markAsDirty();
      return true;
    }
    return false;
  }
}
