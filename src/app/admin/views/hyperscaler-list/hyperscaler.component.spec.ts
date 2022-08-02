import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerComponent } from './hyperscaler.component';



describe('HyperscalerComponent', () => {
  let hyperscaler: HyperscalerComponent
  let mockHyperscalerService, mockConfirmationService, mockMessageService

  let HYPERSCALER_ITEM =  [
    new Hyperscaler({id:1, name:"Name 1", priority: 1}),
    new Hyperscaler({id:2, name:"Name 2", priority: 2})
  ]

  let HYPERSCALER_DELETED = [ new Hyperscaler({id:2, name:"Name 2", priority: 2})]

  beforeEach( () => {
    mockHyperscalerService = jasmine.createSpyObj(["getDataHyperscaler","deleteHyperscaler"])
    mockConfirmationService = jasmine.createSpyObj(["confirm","close"])
    mockMessageService = jasmine.createSpyObj([""])
    hyperscaler = new HyperscalerComponent(mockHyperscalerService,mockConfirmationService,mockMessageService)
  });

  it('getHyperscalerShouldReturnHyperscalerList', () => {
    mockHyperscalerService.getDataHyperscaler.and.returnValue(of(HYPERSCALER_ITEM))
    hyperscaler.getDataHyperscaler()
    expect(hyperscaler.listOfData).not.toEqual(null);
    expect(hyperscaler.listOfData).toEqual(HYPERSCALER_ITEM);
  });


  it('deleteRowShouldDelete', () =>{ 
    mockHyperscalerService.getDataHyperscaler.and.returnValue(of(HYPERSCALER_DELETED))
    mockHyperscalerService.deleteHyperscaler.and.returnValue(of(hyperscaler.getDataHyperscaler())) 
    hyperscaler.deleteRow(HYPERSCALER_ITEM[0])  
    expect(hyperscaler.listOfData).not.toEqual(null);
    expect(hyperscaler.listOfData).toBe(HYPERSCALER_DELETED);
  })



});