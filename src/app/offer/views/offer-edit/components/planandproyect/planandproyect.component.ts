import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  styleUrls: ['./planandproyect.component.scss']
})
export class PlanandproyectComponent implements OnInit {

  message = "No se han encontrado resultados";
  people: Person[] = [];
  hyperscalers: BaseClass[];
  selectedHyperscaler: BaseClass;
  methodologies: BaseClass[];
  selectedMethodology: BaseClass;
  groupPerson: [];
  person: string;
  selectedPerson;

  @Input() data: Offer;
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.dataTeam == null)
      this.data.dataTeam = new OfferDataTeam();
    
    if(this.data.dataTechnology == null){
      this.data.dataTechnology = new OfferDataTechnology();
    }

    if(this.data.dataProject == null){
      this.data.dataProject = new OfferDataProject();
    }

    this.selectedPerson = this.mappingPerson(this.data.teamPerson.map(item => item.person));

    this.getAllHyperscalers();
    this.getAllMethodologies();
  }

  getAllHyperscalers() {

    this.offerService.getAllHyperscalers().subscribe({
      next: (res: BaseClass[]) => {
        this.hyperscalers = res;
      },
      error: () => { },
      complete: () => {
      }
    });
  }

  getAllMethodologies() {

    this.offerService.getAllMethodologies().subscribe({
      next: (res: BaseClass[]) => {
        this.methodologies = res;
      },
      error: () => { },
      complete: () => {
      }
    });
  }

  searchPerson($event) {

    if ($event.query != null) {
      this.offerService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.groupPerson = this.mappingPerson(res);
        },
        error: () => { },
        complete: () => {
        }
      });
    }
  }

  mappingPerson(persons: Person[]): any {

    return persons.map(function (person) {
      return { field: person.name + " " + person.lastname + " - " + person.username, value: person };
    });
  }

  assignTeamPerson(){
    this.data.teamPerson = this.selectedPerson.map(function(person){
      return{
        id: null,
        person: person.value
      }
    })
  }
}
