import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerComponent } from './hyperscaler.component';



describe('HyperscalerComponent', () => {
  let component: HyperscalerComponent;
  let fixture: ComponentFixture<HyperscalerComponent>;
  let hyperscaler: HyperscalerComponent
  let mockHyperscalerService, mockConfirmationService

  let HYPERSCALER_ITEM =  [
    new Hyperscaler({id:1, name:"Name 1", priority: 1}),
    new Hyperscaler({id:2, name:"Name 2", priority: 2})
  ]

  let HYPERSCALER_DELETED = [ new Hyperscaler({id:2, name:"Name 2", priority: 2})]

  beforeEach( () => {
    mockHyperscalerService = jasmine.createSpyObj(["getDataHyperscaler","deleteHyperscaler"])
    mockConfirmationService = jasmine.createSpyObj(["confirm","close"])
    hyperscaler = new HyperscalerComponent(mockHyperscalerService,mockConfirmationService)
  })

  it('getHyperscalerShouldReturnHyperscalerList', () => {
    mockHyperscalerService.getDataHyperscaler.and.returnValue(of(HYPERSCALER_ITEM))
    hyperscaler.getDataHyperscaler()
    expect(hyperscaler.listOfData).not.toEqual(null);
    expect(hyperscaler.listOfData).toEqual(HYPERSCALER_ITEM);
  });

  it('should have called delete once', () => {
    mockHyperscalerService.deleteHyperscaler.and.returnValue(of(true))
    hyperscaler.listOfData = HYPERSCALER_ITEM
    let h = new Hyperscaler()
    hyperscaler.deleteRow(h)
    expect(mockHyperscalerService.deleteHyperscaler).toHaveBeenCalledTimes(1)
  })

  it('deleteRowShouldDelete', () =>{ 
    mockHyperscalerService.deleteHyperscaler.and.returnValue(of(HYPERSCALER_DELETED))
    hyperscaler.listOfData = HYPERSCALER_ITEM
    let h = new Hyperscaler()
    hyperscaler.deleteRow(h)
    expect(hyperscaler.listOfData.length).toEqual(1)
  })



});