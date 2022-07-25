import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Hyperscaler } from '../../model/Hyperscaler';

import { HyperscalerComponent } from './hyperscaler.component';

describe('HyperscalerComponent', () => {
  let component: HyperscalerComponent;
  let fixture: ComponentFixture<HyperscalerComponent>;

  let hyperscaler: HyperscalerComponent
  let mockHyperscalerService

  let BASE = new BaseClass({id: 1, name: "test", priority: 2})
  
  let HYPERSCALER_ITEM =  [
    new Hyperscaler({id:1, name:"Name 1", priority: 1})
  ]


  beforeEach( () => {
    mockHyperscalerService = jasmine.createSpyObj(["getDataHyperscale"])
    hyperscaler = new HyperscalerComponent(mockHyperscalerService)
  })


  it('findPageShouldReturnHyperscalerList', () => {
    mockHyperscalerService.getDataHyperscale.and.returnValue(of(HYPERSCALER_ITEM))
    hyperscaler.getDataHyperscale()
    expect(hyperscaler.listOfData).not.toEqual(null);
    expect(hyperscaler.listOfData).toEqual(HYPERSCALER_ITEM);
  });

});
