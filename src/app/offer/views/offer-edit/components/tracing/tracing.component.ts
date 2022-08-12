import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferTracing } from 'src/app/offer/model/OfferTracing';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import { TracingEditComponent } from './tracing-edit/tracing-edit.component';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss']
})
export class TracingComponent implements OnInit {

  isEditing = false;
  message = "No se han encontrado resultados";
  groupPerson: any[];
  clonedOfferTracing: OfferTracing;
  selectedPerson;
  tracingEdit: OfferTracing[];

  @Input() data: Offer;

  constructor(private dinamicDialogService: DialogService, private offerService: OfferService) { 
  }

  ngOnInit(): void {
  }

  createTracing(){

    const ref = this.dinamicDialogService.open(TracingEditComponent, {
      header: 'Crear siguimiento',
      width: '30%',
      closable: false
    });

    ref.onClose.subscribe((tracing: OfferTracing)=>{
      if(tracing != null){
        this.data.tracings.push(tracing);
      }
    })
  }

  searchPerson($event){

    if($event.query != null){
      this.offerService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => { 
          this.groupPerson = res.map(person => this.mappingPerson(person));
        },
        error: () => {},
        complete: () => {
        }     
      });
    }
  }
  mappingPerson(person: Person): any{
      return {field: person.name + " " + person.lastname + " - " + person.username,  value: person};
  }

  onRowEditInit(tracing: OfferTracing){
    this.isEditing = true;
    this.selectedPerson = this.mappingPerson(tracing.person);
    this.clonedOfferTracing = {...tracing};
  }

  onRowEditCancel(index: number) {
    this.data.tracings[index] = this.clonedOfferTracing;
    delete this.clonedOfferTracing;
    this.isEditing = false;
  }

  transformPerson(person: Person){
    return person.name + " " + person.lastname + " - " + person.username;
  }


}
