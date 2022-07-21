import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTypeListComponent } from './views/file-type-list/file-type-list.component';
import { HyperscalerComponent } from './views/hyperscaler-list/hyperscaler.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [
    FileTypeListComponent,
    HyperscalerComponent
  ],
  imports: [
    CommonModule,
    TableModule

  ]
})
export class AdminModule { }
