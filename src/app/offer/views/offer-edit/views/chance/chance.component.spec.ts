import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Person } from 'src/app/offer/model/Person';

import { ChanceComponent } from './chance.component';

describe('ChanceComponent', () => {
  let component: ChanceComponent;
  let person: Person[];
  let mockOfferService;
  const EXIST_USERNAME = 'aelmouss';
  beforeEach(() => {

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

    component = new ChanceComponent(mockOfferService, jasmine.createSpyObj([]));
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
