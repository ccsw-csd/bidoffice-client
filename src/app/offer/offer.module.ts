import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './views/offer-list/offer-list.component';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { OfferEditComponent } from './views/offer-edit/offer-edit.component';
import { ChanceComponent } from './views/offer-edit/components/chance/chance.component';
import { PlanandproyectComponent } from './views/offer-edit/components/planandproyect/planandproyect.component';
import { DocumentationComponent } from './views/offer-edit/components/documentation/documentation.component';
import { InterestComponent } from './views/offer-edit/components/interest/interest.component';
import { TracingComponent } from './views/offer-edit/components/tracing/tracing.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    OfferListComponent,
    OfferEditComponent,
    ChanceComponent,
    PlanandproyectComponent,
    DocumentationComponent,
    InterestComponent,
    TracingComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule
  ]
})
export class OfferModule { }
