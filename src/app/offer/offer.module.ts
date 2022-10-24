import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './views/offer-list/offer-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { OfferEditComponent } from './views/offer-edit/offer-edit.component';
import { ChanceComponent } from './views/offer-edit/views/chance/chance.component';
import { PlanandproyectComponent } from './views/offer-edit/views/planandproyect/planandproyect.component';
import { DocumentationComponent } from './views/offer-edit/views/documentation/documentation.component';
import { InterestComponent } from './views/offer-edit/views/interest/interest.component';
import { TracingComponent } from './views/offer-edit/views/tracing/tracing.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BlockUIModule } from 'primeng/blockui';
import { DocumentationEditComponent } from './views/offer-edit/views/documentation/documentation-edit/documentation-edit.component';
import { TracingEditComponent } from './views/offer-edit/views/tracing/tracing-edit/tracing-edit.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StatusChangeComponent } from './views/offer-list/status-change/status-change.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ListboxModule} from 'primeng/listbox';
import { OptionStatusComponent } from './views/offer-list/option-status/option-status.component';
import { TradetrackComponent } from './views/offer-edit/views/tradetrack/tradetrack.component';
import { TagModule } from 'primeng/tag';
@NgModule({
  declarations: [
    OfferListComponent,
    OfferEditComponent,
    ChanceComponent,
    PlanandproyectComponent,
    DocumentationComponent,
    InterestComponent,
    TracingComponent,
    DocumentationEditComponent,
    TracingEditComponent,
    StatusChangeComponent,
    OptionStatusComponent,
    TradetrackComponent
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
    CheckboxModule,
    MultiSelectModule,
    AutoCompleteModule,
    BlockUIModule,
    InputNumberModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    ListboxModule,
    TagModule
  ],
})
export class OfferModule {}
