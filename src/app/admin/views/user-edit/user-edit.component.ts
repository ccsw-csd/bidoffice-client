import { Component, OnInit } from '@angular/core';
import { User } from "../../model/User";
import { UserService } from '../../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RoleClass } from "../../model/RoleClass";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  roles: RoleClass[];

  user: User;

  showEmptyMessage: boolean;

  constructor(
    private userService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.roles = [
      {id: 1, name: 'Administrator'},
      {id: 2, name: 'User'}
    ]
  }

  ngOnInit(): void {
    this.user = Object.assign({user: User}, this.config.data.user)

    this.showEmptyMessage = false;
  }

  editUser(item: User) {
    if(item.username != "" && item.email != "") {
      this.userService.saveUser(item).subscribe({
        next: () => {
          this.showEmptyMessage = false;
          this.onClose();
        },
        error: () => {
          this.showEmptyMessage = false;
        }
      });
    } else {
        this.showEmptyMessage = true;
    }
  }

  onClose(){
    this.ref.close();
  }

}
