import { Component, OnInit } from '@angular/core';
import { Offering } from '../../model/Offering';
import { OfferingService } from '../../services/offering.service';

@Component({
  selector: 'app-offering-list',
  templateUrl: './offering-list.component.html',
  styleUrls: ['./offering-list.component.scss']
})
export class OfferingListComponent implements OnInit {

  offeringList: Offering[];

  constructor(private offeringService: OfferingService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.offeringService.getAll().subscribe(
      results => this.offeringList = results
    );
  }

}
