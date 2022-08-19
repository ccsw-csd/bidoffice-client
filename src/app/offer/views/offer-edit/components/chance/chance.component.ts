import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Offer } from 'src/app/offer/model/Offer';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';

@Component({
  selector: 'app-chance',
  templateUrl: './chance.component.html',
  styleUrls: ['./chance.component.scss'],
})
export class ChanceComponent implements OnInit {
  isloading = false;
  message = 'No se han encontrado resultados';
  results: string[] = [];
  offerings: BaseClass[];
  technologies: BaseClass[];
  OfferTypes: BaseClass[];
  sectors: BaseClass[];
  projectType: BaseClass[];
  persons: Person[];
  groupPerson: any[] = [];
  status: BaseClass[];
  selectedManagedBy;
  selectedRequestedBy;
  selectedOfferings: BaseClass[];
  selectedTechnologies: BaseClass[];

  @Input() data: Offer;
  @Input() formValidator: FormGroup;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.getAllOfferings();
    this.getAllTechnologies();
    this.getAllOfferTypes();
    this.getAllSectors();
    this.getAllProjectTypes();
    this.getAllOfferStatus();

    if (this.data.client != undefined) this.results.push(this.data.client);

    if (this.data.requestedBy != null) {
      this.selectedRequestedBy = this.mappingPerson(this.data.requestedBy);
      this.groupPerson.push(this.selectedRequestedBy);
    }

    if (this.data.managedBy != null) {
      this.selectedManagedBy = this.mappingPerson(this.data.requestedBy);
      this.groupPerson.push(this.selectedManagedBy);
    }

    this.selectedOfferings = this.data.offerings.map((item) => item.offering);
    this.selectedTechnologies = this.data.technologies.map(
      (item) => item.technology
    );
  }

  searchClient($event) {
    if ($event.query != null) {
      this.offerService.searchClient($event.query).subscribe({
        next: (res: string[]) => {
          this.results = res;
        },
        error: () => {},
        complete: () => {},
      });
    }
  }

  getAllOfferings() {
    this.offerService.getAllOffering().subscribe({
      next: (res: BaseClass[]) => {
        this.offerings = res;
      },
      error: () => {},
      complete: () => {},
    });
  }
  getAllTechnologies() {
    this.offerService.getAllTechnologies().subscribe({
      next: (res: BaseClass[]) => {
        this.technologies = res;
      },
      error: () => {},
      complete: () => {},
    });
  }

  getAllOfferTypes() {
    this.offerService.getAllOfferTypes().subscribe({
      next: (res: BaseClass[]) => {
        this.OfferTypes = res;
      },
      error: () => {},
      complete: () => {},
    });
  }

  getAllSectors() {
    this.offerService.getAllSectors().subscribe({
      next: (res: BaseClass[]) => {
        this.sectors = res;
      },
      error: () => {},
      complete: () => {},
    });
  }

  getAllProjectTypes() {
    this.offerService.getAllProjectTypes().subscribe({
      next: (res: BaseClass[]) => {
        this.projectType = res;
      },
      error: () => {},
      complete: () => {},
    });
  }

  getAllOfferStatus() {
    this.offerService.getAllOfferStatus().subscribe({
      next: (res: BaseClass[]) => {
        this.status = res;
      },
      error: () => {},
      complete: () => {},
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

  checkValidation(control: string): boolean {
    if (
      this.formValidator.get(control).invalid &&
      this.formValidator.get(control).touched
    ) {
      this.formValidator.controls[control].markAsDirty();
      return true;
    }
    return false;
  }

  mappingPerson(person: Person): any {
    return {
      field: person.name + ' ' + person.lastname + ' - ' + person.username,
      value: person,
    };
  }

  assignOffering() {
    this.data.offerings = this.selectedOfferings.map(item => this.createOfferingSelected(item))
  }

  createOfferingSelected(offering){
    return{
      id: this.data.offerings
      .filter((item) => item.offering.id == offering.id).map(item => item.id).shift(),
      offering: offering,
    }
  }

  assignTechnologies() {
    this.data.technologies = this.selectedTechnologies.map(item => this.createTechnologiesSelected(item));
  }

  createTechnologiesSelected(technology: BaseClass){
    return{
      id: this.data.technologies
      .filter((item) => item.technology.id == technology.id).map(item => item.id).shift(),
      technology: technology,
    }
  }
}
