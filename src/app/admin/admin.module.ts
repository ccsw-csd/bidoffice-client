import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTypeListComponent } from './views/file-type-list/file-type-list.component';
import { HyperscalerListComponent } from './views/hyperscaler-list/hyperscaler-list.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MethodologyListComponent } from './views/methodology-list/methodology-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from "primeng/inputtext";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HyperscalerEditComponent } from './views/hyperscaler-edit/hyperscaler-edit.component';
import { TooltipModule } from 'primeng/tooltip';
import { FileTypeEditComponent } from './views/file-type-edit/file-type-edit.component';
import { ToastModule } from 'primeng/toast';
import { TechnologyListComponent } from './views/technology-list/technology-list.component';
import { OpportunityTypeListComponent } from './views/opportunity-type-list/opportunity-type-list.component';
import { MethodologyEditComponent } from './views/methodology-edit/methodology-edit.component';
import { OfferingListComponent } from './views/offering-list/offering-list.component';
import { OfferingEditComponent } from './views/offering-edit/offering-edit.component';
import { OpportunityTypeEditComponent } from './views/opportunity-type-edit/opportunity-type-edit.component';
import { TechnologyEditComponent } from './views/technology-edit/technology-edit.component';
import { ProjectTypeListComponent } from "./views/project-type-list/project-type-list.component";
import { SectorListComponent } from './views/sector-list/sector-list.component';
import { ProjectTypeEditComponent } from './views/project-type-edit/project-type-edit.component';
import { SectorEditComponent } from './views/sector-edit/sector-edit.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormatDocumentListComponent } from './views/format-document-list/format-document-list.component';
import { FormatDocumentEditComponent } from './views/format-document-edit/format-document-edit.component';

@NgModule({
  declarations: [
    FileTypeListComponent,
    HyperscalerListComponent,
    MethodologyListComponent,
    HyperscalerEditComponent,
    FileTypeEditComponent,
    TechnologyListComponent,
    TechnologyEditComponent,
    OpportunityTypeListComponent,
    MethodologyEditComponent,
    OfferingListComponent,
    OfferingEditComponent,
    OpportunityTypeEditComponent,
    ProjectTypeListComponent,
    SectorListComponent,
    ProjectTypeEditComponent,
    SectorEditComponent,
    FormatDocumentListComponent,
    FormatDocumentEditComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    PaginatorModule,
    InputTextModule,
    DynamicDialogModule,
    TooltipModule,
    ToastModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ]
})
export class AdminModule { }