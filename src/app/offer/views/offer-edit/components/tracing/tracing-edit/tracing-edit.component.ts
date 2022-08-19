import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OfferTracing } from 'src/app/offer/model/OfferTracing';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-tracing-edit',
  templateUrl: './tracing-edit.component.html',
  styleUrls: ['./tracing-edit.component.scss']
})
export class TracingEditComponent implements OnInit {

  message = "No se han encontrado resultados";
  offerTracing: OfferTracing = new OfferTracing();
  groupPerson: [];
  tracingForm : FormGroup;

  constructor(
    private offerService: OfferService, 
    public ref: DynamicDialogRef, 
    private formBuilder : FormBuilder) {}

  ngOnInit(): void {

    this.tracingForm = this.formBuilder.group
    ({
      person: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSave(){

    if(!this.tracingForm.invalid){
      this.offerTracing.uuid = uuidv4();
      this.ref.close(this.offerTracing);
    }
    else{
      Object.keys(this.tracingForm.controls).forEach(control => this.tracingForm.controls[control].markAsDirty());
      this.tracingForm.markAllAsTouched();
    }
  }

  onCancel(){
    this.ref.close();
  }

  searchPerson($event){

    if($event.query != null){
      this.offerService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => { 
          this.groupPerson = this.mappingPerson(res);
        },
        error: () => {},
        complete: () => {
        }     
      });
    }
  }

  mappingPerson(persons: Person[]): any{

    return persons.map(function(person){
      return {field: person.name + " " + person.lastname + " - " + person.username,  value: person};
    });
  }

  checkValidation(control: string): boolean{

    if(this.tracingForm.get(control).invalid && this.tracingForm.get(control).touched){
      this.tracingForm.controls[control].markAsDirty();
      return true;
    }
    return false;
  }
}
