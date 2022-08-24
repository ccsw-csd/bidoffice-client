import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Person } from 'src/app/offer/model/Person';

import { ChanceComponent } from './chance.component';

describe('ChanceComponent', () => {
  let component: ChanceComponent;
  let baseClassData: BaseClass[];
  let person: Person[];
  let mockOfferService;
  const EXIST_USERNAME = 'aelmouss';
  beforeEach(() => {
    baseClassData = [
      {
        id: 1,
        name: 'base',
        priority: 1,
      },
      {
        id: 2,
        name: 'base2',
        priority: 1,
      },
    ];

    person = [
      {
        id: 1,
        saga: 'saga',
        username: 'username',
        email: 'email@bidoffice.com',
        name: 'name',
        lastname: 'lastname',
        center: 'center',
        businesscode: 'businesscode',
        grade: 'grade',
        active: true,
      },
      {
        id: 2,
        saga: 'saga',
        username: 'aelmouss',
        email: 'aelmouss@bidoffice.com',
        name: 'Ayoub',
        lastname: 'El Moussaoui',
        center: 'center',
        businesscode: 'businesscode',
        grade: 'grade',
        active: true,
      },
    ];

    mockOfferService = jasmine.createSpyObj([
      'getAllOffering',
      'getAllTechnologies',
      'getAllOfferTypes',
      'getAllSectors',
      'getAllProjectTypes',
      'getAllOfferStatus',
      'searchPerson',
    ]);

    component = new ChanceComponent(mockOfferService);
  });

  it('shouldReturnListOfferings', () => {
    mockOfferService.getAllOffering.and.returnValue(of(baseClassData));
    component.getAllOfferings();

    expect(component.offerings).not.toEqual(null);
    expect(component.offerings).toEqual(baseClassData);
  });

  it('shouldReturnListTechnologies', () => {
    mockOfferService.getAllTechnologies.and.returnValue(of(baseClassData));
    component.getAllTechnologies();

    expect(component.technologies).not.toEqual(null);
    expect(component.technologies).toEqual(baseClassData);
  });

  it('shouldReturnListOfferTypes', () => {
    mockOfferService.getAllOfferTypes.and.returnValue(of(baseClassData));
    component.getAllOfferTypes();

    expect(component.offerTypes).not.toEqual(null);
    expect(component.offerTypes).toEqual(baseClassData);
  });

  it('shouldReturnListSectors', () => {
    mockOfferService.getAllSectors.and.returnValue(of(baseClassData));
    component.getAllSectors();

    expect(component.sectors).not.toEqual(null);
    expect(component.sectors).toEqual(baseClassData);
  });

  it('shouldReturnListProjectTypes', () => {
    mockOfferService.getAllProjectTypes.and.returnValue(of(baseClassData));
    component.getAllProjectTypes();

    expect(component.projectType).not.toEqual(null);
    expect(component.projectType).toEqual(baseClassData);
  });

  it('shouldReturnListOfferStatus', () => {
    mockOfferService.getAllOfferStatus.and.returnValue(of(baseClassData));
    component.getAllOfferStatus();

    expect(component.status).not.toEqual(null);
    expect(component.status).toEqual(baseClassData);
  });

  it('shouldReturnListSearchPerson', () => {
    let $event: any = {
      query: EXIST_USERNAME,
    };

    let personFilter = person.filter((item) => item.username == EXIST_USERNAME);
    mockOfferService.searchPerson.and.returnValue(of(personFilter));
    component.searchPerson($event);

    expect(component.groupPerson).not.toEqual(null);
    expect(component.groupPerson.map((item) => item.value)).toEqual(
      personFilter
    );
  });
});
