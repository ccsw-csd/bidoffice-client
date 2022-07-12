import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfferEditComponent implements OnInit {
  activeItem: number = 0;
  constructor() { }

  ngOnInit(): void {
   
  }

}
