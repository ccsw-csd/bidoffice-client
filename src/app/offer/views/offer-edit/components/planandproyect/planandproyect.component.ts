import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planandproyect',
  templateUrl: './planandproyect.component.html',
  styleUrls: ['./planandproyect.component.scss']
})
export class PlanandproyectComponent implements OnInit {
  people: Person[] =  [];

  constructor() {
    this.people = [{ name: 'Alvaro', code: 'bAL'},
    {name: 'Pedro', code: 'PD'},
    {name: 'Laura', code: 'LA'},
    {name: 'Antonio', code: 'AN'},
    {name: 'Marta', code: 'MA'},]
  }

  ngOnInit(): void {
  }

}
interface Person {
  name: string,
  code: string
}
