import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferDataChapter } from 'src/app/offer/model/OfferDataChapter';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {

  @Input() data: Offer;
  @Input() readOnly: boolean;
  constructor() { }

  ngOnInit(): void {

    if(this.data.dataChapter == null){
      this.data.dataChapter = new OfferDataChapter();
    }
  }
}
