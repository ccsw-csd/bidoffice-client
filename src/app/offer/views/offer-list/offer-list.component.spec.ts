import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { BaseClass } from '../../model/BaseClass';
import { OfferItemList } from '../../model/OfferItemList';
import { OfferPage } from '../../model/OfferPage';
import { LazyLoadEvent } from 'primeng/api';
import { OfferListComponent } from './offer-list.component';

describe('OfferListComponent', () => {
  let offerListComponent: OfferListComponent;
  let mockOfferService;

  let BASE = new BaseClass({id: 1, name: "test", priority: 2})

  let OFFER_ITEM = [
    new OfferItemList({id: 1, client: "admin", name: "Admin", sector: BASE, requestDate: new Date(), opportunityType: BASE, opportunityStatus: BASE})
  ] ;

  beforeEach(() =>{

    mockOfferService = jasmine.createSpyObj(["findPage"]);
    offerListComponent = new OfferListComponent(mockOfferService, jasmine.createSpyObj([""]), jasmine.createSpyObj([""]));

  })

  it("findPageShouldReturnOfferPage",()=>{

    let pageable: Pageable = {
      pageNumber: 0,
      pageSize: 10,
      sort: [{
        property: 'id',
        direction: 'asc'
      }]
    }

    let event = {} as LazyLoadEvent;
    event = {first: 0, rows: 10}
    
    let offerPage = new OfferPage() 
    offerPage.content = OFFER_ITEM;
    offerPage.pageable = pageable;

    mockOfferService.findPage.and.returnValue(of(offerPage)); 
    offerListComponent.loadPage(event);

    expect(offerListComponent.offerItemList).not.toEqual(null);
    expect(offerListComponent.offerPage.pageable.pageNumber).toEqual(offerPage.pageable.pageNumber);
    expect(offerListComponent.offerItemList).toEqual(OFFER_ITEM);
 })

});
