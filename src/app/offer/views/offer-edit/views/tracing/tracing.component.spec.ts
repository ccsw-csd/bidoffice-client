import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Person } from 'src/app/offer/model/Person';

import { TracingComponent } from './tracing.component';

describe('TracingComponent', () => {
  let component: TracingComponent;
  let persons: Person[];
  let mockOfferService;
  const EXIST_USERNAME = 'aelmouss';
  beforeEach(() => {
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
    mockOfferService = jasmine.createSpyObj(['searchPerson']);
    component = new TracingComponent(
      jasmine.createSpyObj(['']),
      mockOfferService,
      jasmine.createSpyObj([''])
    );
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
