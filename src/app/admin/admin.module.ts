import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './views/user-list/user-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [
    UserListComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        PaginatorModule,
        InputTextModule
    ],
})
export class AdminModule { }
