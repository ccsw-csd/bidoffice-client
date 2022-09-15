import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferTracing } from 'src/app/offer/model/OfferTracing';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import { TracingEditComponent } from './tracing-edit/tracing-edit.component';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss'],
  providers: [ConfirmationService],
})
export class TracingComponent implements OnInit {
  isEditing = false;
  message = 'No se han encontrado resultados';
  groupPerson: any[];
  clonedOfferTracing: OfferTracing;
  selectedPerson;
  tracingEdit: OfferTracing[];

  @Input() data: Offer;

  constructor(
    private dinamicDialogService: DialogService,
    private offerService: OfferService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
  }

  createTracing() {
    const ref = this.dinamicDialogService.open(TracingEditComponent, {
      header: 'Crear siguimiento',
      width: '30%',
      data: this.clonedOfferTracing,
      closable: false,
    });

    ref.onClose.subscribe((tracing: OfferTracing) => {
      if (tracing != null) {
        if(tracing.id != null){
          this.data.tracings[
            this.data.tracings.findIndex((item) => item.id == tracing.id)
          ] = tracing;
        }
        else{
          let index = this.data.tracings.findIndex((item) => item.uuid == tracing.uuid);
          if(index != -1)
            this.data.tracings[index] = tracing
          else
            this.data.tracings.push(tracing);
        }
        delete this.clonedOfferTracing;
      }
    });
  }

  searchPerson($event) {
    if ($event.query != null) {
      this.offerService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.groupPerson = res.map((person) => this.mappingPerson(person));
        },
        error: () => {},
        complete: () => {},
      });
    }
  }
  mappingPerson(person: Person): any {
    return {
      field: person.name + ' ' + person.lastname + ' - ' + person.username,
      value: person,
    };
  }

  onRowEditInit(tracing: OfferTracing) {
    this.clonedOfferTracing = { ...tracing };
    this.createTracing();
  }

  transformPerson(person: Person) {
    return person.name + ' ' + person.lastname + ' - ' + person.username;
  }
 
  commentFromCurrentPerson(person: Person): boolean{
    return this.auth.getUserInfo().username == person.username;
  }
}
