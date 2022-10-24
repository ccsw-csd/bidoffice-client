import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/models/User';
import { UserInfoDetailed } from 'src/app/core/models/UserInfoDetailed';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferTracing } from 'src/app/offer/model/OfferTracing';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tracing-edit',
  templateUrl: './tracing-edit.component.html',
  styleUrls: ['./tracing-edit.component.scss'],
})
export class TracingEditComponent implements OnInit {
  message = 'No se han encontrado resultados';
  offerTracing: OfferTracing = new OfferTracing();
  groupPerson: any[];
  tracingForm: FormGroup;
  personCourrent: string = '';
  user: UserInfoDetailed;
  availableEditing: boolean = true;
  currentDateTime;
  constructor(
    private offerService: OfferService,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.currentDateTime = setInterval(() => {
      this.offerTracing.date = new Date();
    }, 1000);

    if (this.config.data != null) {
      this.offerTracing = this.config.data;
    } else {
      this.offerTracing.uuid = uuidv4();
    }

    this.tracingForm = this.formBuilder.group({
      person: [{ value: '', disabled: true }, Validators.required],
      comment: ['', Validators.required],
      date: [{ value: '', disabled: true }, Validators.required],
    });

    this.searchPerson(this.auth.getUserInfo().username);
  }

  ngOnDestroy() {
    clearInterval(this.currentDateTime);
  }

  onSave() {
    if (!this.tracingForm.invalid) {
      this.ref.close(this.offerTracing);
    } else {
      Object.keys(this.tracingForm.controls).forEach((control) =>
        this.tracingForm.controls[control].markAsDirty()
      );
      this.tracingForm.markAllAsTouched();
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
        this.offerTracing.date = new Date();
      },
      error: () => {},
      complete: () => {},
    });
  }

  mappingPerson(person: Person): any {
    this.offerTracing.person = person;
    return {
      field: person.name + ' ' + person.lastname + ' - ' + person.username,
      value: person,
    };
  }

  checkValidation(control: string): boolean {
    if (
      this.tracingForm.get(control).invalid &&
      this.tracingForm.get(control).touched
    ) {
      this.tracingForm.controls[control].markAsDirty();
      return true;
    }
    return false;
  }
}
