import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MethodologyListComponent } from './views/methodology-list/methodology-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MethodologyListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ]
})
export class MethodologyModule { }
