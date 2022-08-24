import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { Pageable } from "../../../core/models/Pageable";
import { LazyLoadEvent } from "primeng/api";
import { of } from "rxjs";
import { UserPage } from "../../model/UserPage";
import { User } from "../../model/User";
import { RoleClass } from "../../model/RoleClass";

describe('UserListComponent', () => {
  let userListComponent;
  let cdRef;
  let mockUserService;
  let dynamicDialogService
  let mockSnackService

  let ROLE = new RoleClass({id: 2, name: "User"})

  let USER_ITEM = [
    new User({id: 11, username: "angeherr", email: "angeherr@capgemini.com", firstName: "Angello", lastName: "Herrera", role: ROLE})
  ] ;

  beforeEach(()=>{
    mockUserService = jasmine.createSpyObj(["findPage"]);
    cdRef = jasmine.createSpyObj([""]);
    dynamicDialogService = jasmine.createSpyObj([""])
    mockSnackService = jasmine.createSpyObj(["error","showMessage"])
    userListComponent = new UserListComponent(mockUserService, cdRef, dynamicDialogService);
  })

  it("findPageShouldReturnUserPage", ()=>{
    let pageable: Pageable = {
      pageNumber: 0,
      pageSize: 10,
      sort: [{
        property: 'username',
        direction: 'asc'
      }]
    }

    let event = {} as LazyLoadEvent;
    event = {first: 0, rows: 10}

    let userPage = new UserPage()
    userPage.content = USER_ITEM;
    userPage.pageable = pageable;

    mockUserService.findPage.and.returnValue(of(userPage));
    userListComponent.loadPage(event);

    expect(userListComponent.user).not.toEqual(null);
    expect(userListComponent.userPage.pageable.pageNumber).toEqual(userPage.pageable.pageNumber);
    expect(userListComponent.listOfData).toEqual(USER_ITEM);

  })
});
