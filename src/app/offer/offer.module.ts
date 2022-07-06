import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './views/offer-list/offer-list.component';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    OfferListComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule
  ]
})
export class OfferModule { }
