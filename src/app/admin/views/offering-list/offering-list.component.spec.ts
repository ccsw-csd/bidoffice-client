import { Offering } from '../../model/Offering';
import { OfferingListComponent } from './offering-list.component';
import { of } from 'rxjs';

describe('OfferingListComponent', () => {
  let offering: OfferingListComponent;
  let mockOfferingService
  let mockConfirmationService
  let mockSnackService
  let mockDynamicDialogRef
  let mockDialogService

  let OFFERING_ITEMS: Offering[];

  let OFFERING_DELETED: Offering[];

  beforeEach(async () => {

  OFFERING_ITEMS =  [
    new Offering({id:1, name:"Name1", priority: 1}),
    new Offering({id:2, name:"Name2", priority: 2})
  ]

  OFFERING_DELETED = [ new Offering({id:2, name:"Name2", priority: 2}) ]

    mockOfferingService = jasmine.createSpyObj(["getAll","deleteOffering"])
   
    mockDynamicDialogRef = jasmine.createSpyObj([""])
    mockDialogService = jasmine.createSpyObj([""])
    mockSnackService = jasmine.createSpyObj(["error", "showMessage"])

    offering = new OfferingListComponent(mockOfferingService, mockSnackService, mockDynamicDialogRef, mockDialogService)
  });

  it('getAllShouldReturnOfferingList', () => {
    mockOfferingService.getAll.and.returnValue(of(OFFERING_ITEMS))
    offering.getAll()
    expect(offering.offeringList).not.toBeNull()
    expect(offering.offeringList).toEqual(OFFERING_ITEMS)
  });

  it('deleteOfferingShouldDelete', () => {
    mockOfferingService.getAll.and.returnValue(of(OFFERING_DELETED))
    mockOfferingService.deleteOffering.and.returnValue(of(offering.getAll()))
    offering.deleteOffering(OFFERING_ITEMS[1])
    expect(offering.offeringList).not.toBeNull()
    expect(offering.offeringList).toEqual(OFFERING_DELETED)
  });
});
