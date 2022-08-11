import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { User } from "../../model/User";
import { RoleClass } from "../../model/RoleClass";
import { of } from "rxjs";

describe('UserEditComponent', () => {
  let userEditComponent;
  let mockUserService;
  let ref;
  let dynamicDialogConfig;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj(["saveUser"]);
    ref = jasmine.createSpyObj([""]);
    dynamicDialogConfig = jasmine.createSpyObj([""])
    userEditComponent = new UserEditComponent(mockUserService, ref, dynamicDialogConfig);
  });

  it("editUserShouldUpdate", ()=>{
    let user = new User({id:11, username:"angeherr", email:"angeherr@capgemini.com", firstName:"Angello", lastName:"Herrera", role:{id: 2, name:"User"}});
    mockUserService.saveUser.and.returnValue(of(true));
    expect(userEditComponent.editUser(user)).not.toBeNull();
    expect(userEditComponent.showEmptyMessage).toEqual(false)
  })

  it("editUserWithEmptyEmailFieldShouldThrowError", ()=>{
    let user = new User({id:11, username:"angeherr", email:"", firstName:"Angello", lastName:"Herrera", role:{id: 2, name:"User"}});
    expect(userEditComponent.editUser(user)).not.toBeNull();
    expect(userEditComponent.showEmptyMessage).toEqual(true);
  })

});
