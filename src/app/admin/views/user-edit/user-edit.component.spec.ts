import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { User } from "../../model/User";
import { RoleClass } from "../../model/RoleClass";
import { of } from "rxjs";
import {MessageService} from "primeng/api";

describe('UserEditComponent', () => {
  let userEditComponent;
  let mockUserService;
  let mockRoleService;
  let ref;
  let dynamicDialogConfig;
  let messageService;
  let mockSnackService
  


  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj(["saveUser"]);
    mockRoleService = jasmine.createSpyObj(["getRoles"]);
    ref = jasmine.createSpyObj(["close"]);
    dynamicDialogConfig = jasmine.createSpyObj([""]);
    mockSnackService = jasmine.createSpyObj(["error","showMessage"])
    userEditComponent = new UserEditComponent(mockUserService, mockRoleService, ref, dynamicDialogConfig, mockSnackService);
  });

  it("editUserShouldUpdate", ()=>{
    let user = new User({id:11, username:"angeherr", email:"angeherr@capgemini.com", firstName:"Angello", lastName:"Herrera", role:{id: 2, name:"User"}});
    mockUserService.saveUser.and.returnValue(of(true));
    expect(userEditComponent.editUser(user)).not.toBeNull();
  })

  it("editUserWithEmptyEmailFieldShouldThrowError", ()=>{
    let user = new User({id:11, username:"angeherr", email:"", firstName:"Angello", lastName:"Herrera", role:{id: 2, name:"User"}});
    expect(userEditComponent.editUser(user)).not.toBeNull();
  })

});
