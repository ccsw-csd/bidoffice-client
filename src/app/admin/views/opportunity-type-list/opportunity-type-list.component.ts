import { Component, OnInit } from '@angular/core';
import { OpportunityType } from '../../model/OppurtinityType';
import { OpportunityTypeService } from '../../services/opportunity-type.service';

@Component({
  selector: 'app-opportunity-type-list',
  templateUrl: './opportunity-type-list.component.html',
  styleUrls: ['./opportunity-type-list.component.scss']
})
export class OpportunityTypeListComponent implements OnInit {

  opportunityList: OpportunityType[]

  constructor(private opportunityService: OpportunityTypeService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(){
    this.opportunityService.findAll().subscribe(
      results => this.opportunityList = results
    )   
  }

}
