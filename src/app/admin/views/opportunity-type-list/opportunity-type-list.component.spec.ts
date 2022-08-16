import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OpportunityType } from '../../model/OppurtinityType';
import { OpportunityTypeService } from '../../services/opportunity-type.service';

import { OpportunityTypeListComponent } from './opportunity-type-list.component';

describe('OpportunityTypeListComponent', () => {
  let opportunityTypeList: OpportunityTypeListComponent;
  let mockOpportunityTypeService;
  let mockConfirmationService;
  let mockMessageService;

  let DATA_LIST = [
    new OpportunityType({id:1, name:"Name 1", priority: 1}),
    new OpportunityType({id:2, name:"Name 2", priority: 2})
  ]

  let DATA_DELETED = [
    new OpportunityType({id:1, name:"Name 1", priority: 1})
  ]

  beforeEach(() => {
    mockOpportunityTypeService = jasmine.createSpyObj(["findAll","delete"])
    mockConfirmationService = ["confirm"]
    mockMessageService = [""]
    opportunityTypeList = new OpportunityTypeListComponent(
      mockOpportunityTypeService,
      mockMessageService,
      mockConfirmationService
      );

  });

  it('findAllTypeShouldReturnOpportunityTypeList', () =>{
    mockOpportunityTypeService.findAll.and.returnValue(of(DATA_LIST))
    opportunityTypeList.findAll()
    expect(opportunityTypeList.opportunityList).not.toEqual(null);
    expect(opportunityTypeList.opportunityList).toEqual(DATA_LIST);
  });

  it('deleteWithoutErrorsShouldDelete', () => {
    mockOpportunityTypeService.findAll.and.returnValue(of(DATA_DELETED))
    mockOpportunityTypeService.findAll.and.returnValue(mockOpportunityTypeService.findAll)
    let opportunity = new OpportunityType()
    opportunityTypeList.deleteRow(opportunity)

    expect(opportunityTypeList.opportunityList).toEqual(DATA_DELETED)
  })
})
  

