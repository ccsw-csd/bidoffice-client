import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileTypeListComponent } from './admin/views/file-type-list/file-type-list.component';
import { HyperscalerListComponent } from './admin/views/hyperscaler-list/hyperscaler-list.component';
import { AuthGuard } from './core/services/auth.guard';
import { LayoutComponent } from './core/views/layout/layout.component';
import { LoginComponent } from './login/views/login/login.component';
import { OfferListComponent } from './offer/views/offer-list/offer-list.component';
import { MethodologyListComponent } from './admin/views/methodology-list/methodology-list.component';
import { TechnologyListComponent } from './admin/views/technology-list/technology-list.component';
import { OpportunityTypeListComponent } from './admin/views/opportunity-type-list/opportunity-type-list.component';
import { OfferingListComponent } from './admin/views/offering-list/offering-list.component';
import { ProjectTypeListComponent } from './admin/views/project-type-list/project-type-list.component';
import { SectorListComponent } from './admin/views/sector-list/sector-list.component';
import { FormatDocumentListComponent } from './admin/views/format-document-list/format-document-list.component';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    resolve: {credentials: RefreshTokenResolverService},
    canActivate: [AuthGuard],
    children: [
      { path: 'methodology', component: MethodologyListComponent },
      { path: 'main', component: OfferListComponent },
      { path: 'filetype', component: FileTypeListComponent },
      { path: 'hyperscaler', component: HyperscalerListComponent},
      { path: 'technology', component: TechnologyListComponent},
      { path: 'opportunitytype', component: OpportunityTypeListComponent},
      { path: 'offering', component: OfferingListComponent},
      { path: 'projecttype', component: ProjectTypeListComponent},
      { path: 'sector', component: SectorListComponent},
      {path: 'formatdocument', component: FormatDocumentListComponent},
      { path: '**', redirectTo: 'main', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
