import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTypeListComponent } from './views/file-type-list/file-type-list.component';
import { HyperscalerComponent } from './views/hyperscaler-list/hyperscaler.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MethodologyListComponent } from './views/methodology-list/methodology-list.component';
import { UserListComponent } from './views/user-list/user-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from "primeng/inputtext";
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { HyperscalerEditComponent } from './views/hyperscaler-edit/hyperscaler-edit.component';
import {TooltipModule} from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { TechnologyListComponent } from './views/technology-list/technology-list.component';

@NgModule({
  declarations: [
    FileTypeListComponent,
    HyperscalerComponent,
    MethodologyListComponent,
    UserListComponent,
    HyperscalerEditComponent,
    TechnologyListComponent
  ],
 
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    PaginatorModule,
    InputTextModule,
    DynamicDialogModule,
    TooltipModule,
    ToastModule
  ]
})
export class AdminModule { }
