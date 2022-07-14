import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HyperscalerComponent } from './hyperscaler/views/hyperscaler.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [
    HyperscalerComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class AdminModule { }
