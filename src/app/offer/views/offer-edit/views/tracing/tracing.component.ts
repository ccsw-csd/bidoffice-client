import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferTracing } from 'src/app/offer/model/OfferTracing';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import { TracingEditComponent } from './tracing-edit/tracing-edit.component';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { Table } from 'primeng/table';

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
  @Input() data: Offer;
  @ViewChild('table') table: Table;

  constructor(
    private dinamicDialogService: DialogService,
    private offerService: OfferService,
    public auth: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
  }

  createTracing() {
    const ref = this.dinamicDialogService.open(TracingEditComponent, {
      header: 'Crear nuevo mensaje',
      width: '30%',
      data: this.clonedOfferTracing,
      closable: false,
    });

    ref.onClose.subscribe((tracing: OfferTracing) => {
      if (tracing != null && tracing.uuid != null) {
        let index = this.data.tracings.findIndex((item) => item.uuid == tracing.uuid);
        if(index != -1)
          this.data.tracings[index] = tracing;
        else{

          this.data.tracings.push(tracing);
          if(this.isAscendig(this.table.value))
            this.table.value.push(tracing);
          else
            this.table.value.unshift(tracing);
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

  onDeleteRow(tracing: OfferTracing) {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Esta seguro que desea eliminar este registro?',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-secondary',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        if(tracing.uuid != null)
          this.data.tracings = this.data.tracings.filter(item => item.uuid != tracing.uuid)
      },
      reject: () => {},
    });
  }

  isAscendig(arry: OfferTracing[]): boolean {
    return  arry.every((b, i, { [i - 1]: a }) => !i || a.date <= b.date);
  }
}
