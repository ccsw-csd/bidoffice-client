import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chance',
  templateUrl: './chance.component.html',
  styleUrls: ['./chance.component.scss']
})
export class ChanceComponent implements OnInit {
  cities: City[];

  constructor() { this.cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
]; }

  ngOnInit(): void {
  }

}
interface City {
  name: string,
  code: string
}

