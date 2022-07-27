import { Component, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferService } from 'src/app/offer/services/offer.service';

@Component({
  selector: 'app-chance',
  templateUrl: './chance.component.html',
  styleUrls: ['./chance.component.scss']
})
export class ChanceComponent implements OnInit {

  filterClient: string = "";
  results: string[] = [];
  offerings: BaseClass[];
  selectedOfferings: BaseClass[];
  technologies: BaseClass[];
  selectedTechnologies: BaseClass[];
  OfferTypes: BaseClass[];
  selectedOfferType: BaseClass;
  cities: City[];

  constructor(private offerService: OfferService) { this.cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
]; }

  ngOnInit(): void {
   // this.getAllOfferings();
    //this.getAllTechnologies();
    //this.getAllOfferTypes();
  }

  searchClient($event){
    this.offerService.searchClient(this.filterClient).subscribe({
      next: (res: string[]) => { 
        this.results = res;
      },
      error: () => {},
      complete: () => {
      }     
    });
  }

  getAllOfferings(){

    this.offerService.getAllOffering().subscribe({
      next: (res: BaseClass[]) => { 
        this.offerings = res;
      },
      error: () => {},
      complete: () => {
      }     
    });
  }

  getAllTechnologies(){

    this.offerService.getAllTechnologies().subscribe({
      next: (res: BaseClass[]) => { 
        this.technologies = res;
      },
      error: () => {},
      complete: () => {
      }     
    });
  }

  getAllOfferTypes(){

    this.offerService.getAllOfferTypes().subscribe({
      next: (res: BaseClass[]) => { 
        this.OfferTypes = res;
      },
      error: () => {},
      complete: () => {
      }     
    });
  }

}
interface City {
  name: string,
  code: string
}

