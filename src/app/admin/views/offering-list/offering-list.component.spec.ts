import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Offering } from '../../model/Offering';
import { OfferingListComponent } from './offering-list.component';
import { of } from 'rxjs';

describe('OfferingListComponent', () => {
  let offeringListComponent: OfferingListComponent;
  let mockOfferingService;

  beforeEach(async () => {
    mockOfferingService = jasmine.createSpyObj(['getAll']);
    offeringListComponent = new OfferingListComponent(mockOfferingService);
  });

  it('getAllShouldReturnOfferingList', () => {
    let offering : Offering[];
    mockOfferingService.getAll.and.returnValue(of(offering)); 
      offeringListComponent.ngOnInit();
      expect(offeringListComponent.offeringList).not.toEqual(null);
      expect(offeringListComponent.offeringList).toEqual(offering);
  });
});
