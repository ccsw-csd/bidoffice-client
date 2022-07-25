import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTypeListComponent } from './views/file-type-list/file-type-list.component';
import { HyperscalerComponent } from './views/hyperscaler-list/hyperscaler.component';
import { MethodologyListComponent } from './views/methodology-list/methodology-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    FileTypeListComponent,
    HyperscalerComponent,
    MethodologyListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ]
})
export class AdminModule { }
