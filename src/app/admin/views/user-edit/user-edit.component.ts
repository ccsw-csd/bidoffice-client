import { Component, OnInit } from '@angular/core';
import { User } from "../../model/User";
import { UserService } from '../../services/user.service';
import { RoleService } from "../../services/role.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RoleClass } from "../../model/RoleClass";
import { MessageService } from "primeng/api";

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
    private messageService: MessageService
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
          this.showSuccessMessage();
          this.onClose();
        },
        error: () => {
          this.showErrorMessage();
        }
      });
    }
  }

  onClose(){
    this.ref.close();
  }

  showSuccessMessage(){
    this.messageService.add({
      key: 'userMessage',
      severity:'success',
      summary:'Éxito',
      detail:'La operación se ha llevado a cabo correctamente'});
  }

  showErrorMessage(){
    this.messageService.add({
      key: 'userMessage',
      severity:'error',
      summary:'Error',
      detail:'Error'});
  }

}
