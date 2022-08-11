import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Pageable } from "../../../core/models/Pageable";
import { UserService } from '../../services/user.service';
import { User } from "../../model/User";
import { UserPage } from "../../model/UserPage";
import { LazyLoadEvent } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { UserEditComponent } from "../user-edit/user-edit.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  pageable: Pageable = {
    pageNumber: 0,
    pageSize: 5,
    sort: [{
      property: 'username',
      direction: 'asc'
    }]
  }

  userPage: UserPage;
  listOfData : User[];
  totalElements: number;
  isloading: boolean = false;
  filterUsername: string;
  filterName: string;
  lastTableLazyLoadEvent: LazyLoadEvent;

  constructor(
    private userService: UserService,
    private cdRef : ChangeDetectorRef,
    private dynamicDialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterUsername = null;
    this.filterName = null;
    this.loadPage(this.lastTableLazyLoadEvent);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadPage(event?:LazyLoadEvent) {

    if (event != null) {
      this.lastTableLazyLoadEvent = event;
      this.pageable.pageSize = event.rows;
      this.pageable.pageNumber = event.first / event.rows;

      if (event.sortField != null){
        this.pageable.sort = [{property:event.sortField, direction:event.sortOrder == 1 ? 'asc':'desc'}];
      }

      this.isloading = true;
      this.userService.findPage(this.pageable, this.filterUsername, this.filterName).subscribe({
        next: (res: UserPage) => {
          this.userPage = res;
        },
        error: () => {},
        complete: () => {
          this.listOfData = this.userPage.content;
          this.totalElements = this.userPage.totalElements;
          this.isloading = false;
        }
      });
    }

  }

  showEditDialog(user: User){
    const dialogRef = this.dynamicDialogService.open(UserEditComponent,{
      header: "Editar Usuario",
      width: "40%",
      data: {user: user}
    })

    dialogRef.onClose.subscribe(res =>{
      this.loadPage(this.lastTableLazyLoadEvent);
    })
  }

}
