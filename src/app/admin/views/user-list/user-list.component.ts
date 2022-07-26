import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Pageable } from "../../../core/models/Pageable";
import { UserService } from '../../services/user.service';
import { User } from "../../model/User";
import { UserPage } from "../../model/UserPage";
import { LazyLoadEvent } from "primeng/api";

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

  constructor(
    private userService: UserService,
    private cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterUsername = null;
    this.filterName = null;
    this.onSearch();
  }

  onSearch(): void {
    let username = this.filterUsername;
    let name = this.filterName;

    this.isloading = true;
    this.userService.findPage(this.pageable, username, name).subscribe({
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

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadPage(event?:LazyLoadEvent) {

    if (event != null) {
      this.pageable.pageSize = event.rows;
      this.pageable.pageNumber = event.first / event.rows;
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

}
