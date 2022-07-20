import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileTypeListComponent } from './views/file-type-list/file-type-list.component';


@NgModule({
  declarations: [
    FileTypeListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    
  ]
})
export class AdminModule { }
