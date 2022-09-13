import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { ModifyStatus } from 'src/app/offer/model/ModifyStatus';
import { OfferItemList } from 'src/app/offer/model/OfferItemList';

import { StatusChangeComponent } from './status-change.component';

describe('StatusChangeComponent', () => {
  let component: StatusChangeComponent;
  let mockService;
  let emptyMock;
  let dataStatus: BaseClass[] = [];
  beforeEach(() => {
    emptyMock = jasmine.createSpyObj(['']);
    mockService = jasmine.createSpyObj(['getAllOfferStatus', 'modifyStatus']);
    component = new StatusChangeComponent(
      mockService,
      emptyMock,
      emptyMock,
      emptyMock,
      emptyMock,
      emptyMock
    );

    dataStatus = [
      { id: 1, name: 'En Curso', priority: 1 },
      { id: 1, name: 'Finalizada', priority: 1 },
    ];
  });

  it('getAllOpportunityStatusShouldListOpportunityStatus', () => {
    mockService.getAllOfferStatus.and.returnValue(of(dataStatus));
    component.getAllOfferStatus();

    expect(component.offerStatus).toEqual(dataStatus);
  });
});
