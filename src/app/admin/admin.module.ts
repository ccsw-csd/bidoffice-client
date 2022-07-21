import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HyperscalerComponent } from './views/hyperscaler-list/hyperscaler.component';
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
