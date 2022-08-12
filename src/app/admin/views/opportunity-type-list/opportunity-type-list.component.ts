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
  isLoading: boolean = false
  constructor(private opportunityService: OpportunityTypeService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(){
    this.isLoading = true
    this.opportunityService.findAll().subscribe({
      next: (results) =>{
        this.opportunityList = results
      },
      error: () =>{},
      complete: () => { this.isLoading = false}
    }) 
      
  }

}
