import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { Person } from 'src/app/offer/model/Person';

import { PlanandproyectComponent } from './planandproyect.component';

describe('PlanandproyectComponent', () => {
  let component: PlanandproyectComponent;
  let baseClassData: BaseClass[];
  let mockOfferService;
  let persons: Person[];
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

    persons = [
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
      'getAllHyperscalers',
      'getAllMethodologies',
      'searchPerson',
    ]);

    component = new PlanandproyectComponent(mockOfferService);
  });

  it('shouldReturnListHyperscalers', () => {
    mockOfferService.getAllHyperscalers.and.returnValue(of(baseClassData));
    component.getAllHyperscalers();

    expect(component.hyperscalers).not.toEqual(null);
    expect(component.hyperscalers).toEqual(baseClassData);
  });

  it('shouldReturnListMethodologie', () => {
    mockOfferService.getAllMethodologies.and.returnValue(of(baseClassData));
    component.getAllMethodologies();

    expect(component.methodologies).not.toEqual(null);
    expect(component.methodologies).toEqual(baseClassData);
  });

  it('shouldReturnListSearchPerson', () => {
    let $event: any = {
      query: EXIST_USERNAME,
    };

    let personFilter = persons.filter(
      (item) => item.username == EXIST_USERNAME
    );
    mockOfferService.searchPerson.and.returnValue(of(personFilter));
    component.searchPerson($event);

    expect(component.groupPerson).not.toEqual(null);
    expect(component.groupPerson.map((item) => item.value)).toEqual(
      personFilter
    );
  });
});
