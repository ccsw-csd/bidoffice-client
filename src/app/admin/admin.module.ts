import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFiletypeComponent } from './admin-filetype/admin-filetype.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [
    AdminFiletypeComponent,
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class AdminModule { }
