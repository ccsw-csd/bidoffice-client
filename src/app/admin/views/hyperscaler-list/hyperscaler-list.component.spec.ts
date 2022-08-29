import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerListComponent } from './hyperscaler-list.component';



describe('HyperscalerListComponent', () => {
  let hyperscaler: HyperscalerListComponent
  let mockHyperscalerService, mockConfirmationService, mockDynamicDialogRef, mockDialogService

  let HYPERSCALER_ITEM =  [
    new Hyperscaler({id:1, name:"Name 1", priority: 1}),
    new Hyperscaler({id:2, name:"Name 2", priority: 2})
  ]

  let HYPERSCALER_DELETED = [ new Hyperscaler({id:2, name:"Name 2", priority: 2})]

  beforeEach( () => {
    mockHyperscalerService = jasmine.createSpyObj(["getDataHyperscaler","deleteHyperscaler","saveHyperscaler"])
    mockConfirmationService = jasmine.createSpyObj(["confirm","close"])
    mockDynamicDialogRef = jasmine.createSpyObj([""])
    mockDialogService = jasmine.createSpyObj([""])
    
    hyperscaler = new HyperscalerListComponent(mockHyperscalerService,
      mockConfirmationService,
      mockDialogService,
      mockDynamicDialogRef,
      )
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