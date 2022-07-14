import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileTypeComponent } from './file-type/views/file-type.component';


@NgModule({
  declarations: [
    FileTypeComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    
  ]
})
export class AdminModule { }
