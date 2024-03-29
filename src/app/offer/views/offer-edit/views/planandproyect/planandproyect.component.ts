import { Component, Input, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferDataProject } from 'src/app/offer/model/OfferDataProject';
import { OfferDataTeam } from 'src/app/offer/model/OfferDataTeam';
import { OfferDataTechnology } from 'src/app/offer/model/OfferDataTechnology';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';

@Component({
  selector: 'app-planandproyect',
  templateUrl: './planandproyect.component.html',
  styleUrls: ['./planandproyect.component.scss'],
})
export class PlanandproyectComponent implements OnInit {
  message = 'No se han encontrado resultados';
  people: Person[] = [];
  hyperscalers: BaseClass[];
  selectedHyperscaler: BaseClass;
  methodologies: BaseClass[];
  selectedMethodology: BaseClass;
  groupPerson: any[] = [];
  person: string;
  selectedPerson;
  selectedPersonList = [];
  @Input() data: Offer;
  @Input() readOnly: boolean;
  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    if (this.data.dataTeam == null) this.data.dataTeam = new OfferDataTeam();
    if (this.data.dataTechnology == null) this.data.dataTechnology = new OfferDataTechnology();
    if (this.data.dataProject == null) this.data.dataProject = new OfferDataProject();

    this.selectedPersonList = this.mappingPerson(
      this.data.teamPerson.map((item) => item)
    );
    this.getAllHyperscalers();
    this.getAllMethodologies();
  }

  getAllHyperscalers() {
    this.offerService.getAllHyperscalers().subscribe({
      next: (res: BaseClass[]) => {
        this.hyperscalers = res;
      },
      error: () => {},
      complete: () => {},
    });
  }

  getAllMethodologies() {
    this.offerService.getAllMethodologies().subscribe({
      next: (res: BaseClass[]) => {
        this.methodologies = res;
      },
      error: () => {},
      complete: () => {},
    });
  }

  searchPerson($event) {
    if ($event.query != null) {
      this.offerService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.groupPerson = this.mappingPerson(res);
        },
        error: () => {},
        complete: () => {},
      });
    }
  }

  mappingPerson(persons: Person[]): any {
    return persons.map(function (person) {
      return {
        field: person.name + ' ' + person.lastname + ' - ' + person.username,
        value: person,
      };
    });
  }

  assignTeamPerson() {
    if (
      !this.selectedPersonList.some(
        (item) => item.value.id == this.selectedPerson.value.id
      )
    ) {
      this.data.teamPerson.push(this.selectedPerson.value);
      this.selectedPersonList = [
        ...this.selectedPersonList,
        this.selectedPerson,
      ];
    }
    this.selectedPerson = '';
  }

  onDeletePerson(person: Person) {
    this.data.teamPerson = this.data.teamPerson.filter(
      (item) => item.id != person.id
    );
    this.selectedPersonList = this.selectedPersonList.filter(
      (item) => item.value.id != person.id
    );
  }

  getUserLastModification(person: Person) : string {
    if (!person) return '';

    return person.name + ' '+ person.lastname;

  }
}
