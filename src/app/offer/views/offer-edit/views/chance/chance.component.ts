import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Offer } from 'src/app/offer/model/Offer';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import { forkJoin } from 'rxjs';

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
  offerTypes: BaseClass[];
  sectors: BaseClass[];
  projectType: BaseClass[];
  persons: Person[];
  groupPerson: any[] = [];
  status: BaseClass[];
  selectedManagedBy;
  selectedRequestedBy;
  selectedOfferings: BaseClass[];
  selectedTechnologies: BaseClass[];
  isLoading: boolean = false;
  @Input() data: Offer;
  @Input() formValidator: FormGroup;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.isLoading = true;
    forkJoin({
      requestOfferings: this.offerService.getAllOffering(),
      requestTechnologies: this.offerService.getAllTechnologies(),
      requestOfferTypes: this.offerService.getAllOfferTypes(),
      requestSectors: this.offerService.getAllSectors(),
      requestProjectTypes: this.offerService.getAllProjectTypes(),
      requestOfferStatus: this.offerService.getAllOfferStatus(),
    }).subscribe(
      ({
        requestOfferings,
        requestTechnologies,
        requestOfferTypes,
        requestSectors,
        requestProjectTypes,
        requestOfferStatus,
      }) => {
        this.offerings = requestOfferings;
        this.technologies = requestTechnologies;
        this.offerTypes = requestOfferTypes;
        this.sectors = requestSectors;
        this.projectType = requestProjectTypes;
        this.status = requestOfferStatus;

        this.isLoading = false;
      }
    );

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
    this.data.offerings = this.selectedOfferings.map((item) =>
      this.createOfferingSelected(item)
    );
  }

  createOfferingSelected(offering) {
    return {
      id: null,
      offering: offering,
    };
  }

  assignTechnologies() {
    this.data.technologies = this.selectedTechnologies.map((item) =>
      this.createTechnologiesSelected(item)
    );
  }

  createTechnologiesSelected(technology: BaseClass) {
    return {
      id: null,
      technology: technology,
    };
  }
}
