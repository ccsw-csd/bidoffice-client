import { Component, OnInit } from '@angular/core';
import { User } from "../../model/User";
import { UserService } from '../../services/user.service';
import { RoleService } from "../../services/role.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RoleClass } from "../../model/RoleClass";
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  roles: RoleClass[] = [];

  user: User;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.user = Object.assign({user: User}, this.config.data.user)
    this.roleService.getRoles().subscribe(rolesArray =>
      this.roles = [...this.roles, ...rolesArray]
    );
  }

  editUser(item: User) {
    if(item.username != "" && item.email != "") {
      this.userService.saveUser(item).subscribe({
        next: () => {
          this.snackbarService.showMessage('El registro se ha guardado con éxito')
          this.onClose();
        },
        error: () => {
          this.snackbarService.error('Error'); 
        }
      });
    }
  }

  onClose(){
    this.ref.close();
  }
}
