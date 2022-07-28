import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTypeListComponent } from './views/file-type-list/file-type-list.component';
import { HyperscalerComponent } from './views/hyperscaler-list/hyperscaler.component';
import { MethodologyListComponent } from './views/methodology-list/methodology-list.component';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { UserListComponent } from './views/user-list/user-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from "primeng/inputtext";


@NgModule({
  declarations: [
    FileTypeListComponent,
    HyperscalerComponent,
    MethodologyListComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    PaginatorModule,
    InputTextModule
  ]
})
export class AdminModule { }
