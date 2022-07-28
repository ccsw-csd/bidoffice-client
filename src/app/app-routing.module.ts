import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileTypeListComponent } from './admin/views/file-type-list/file-type-list.component';
import { HyperscalerComponent } from './admin/views/hyperscaler-list/hyperscaler.component';
import { AuthGuard } from './core/services/auth.guard';
import { UserResolverService } from './core/services/user-resolver.service';
import { LayoutComponent } from './core/views/layout/layout.component';
import { LoginComponent } from './login/views/login/login.component';
import { OfferListComponent } from './offer/views/offer-list/offer-list.component';
import { UserListComponent } from "./admin/views/user-list/user-list.component";
import { MethodologyListComponent } from './admin/views/methodology-list/methodology-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    resolve: {user: UserResolverService},
    children: [
      { path: 'methodology', component: MethodologyListComponent },
      { path: 'main', component: OfferListComponent },
      { path: 'filetype', component: FileTypeListComponent },
      { path: 'user', component: UserListComponent },
      { path: 'hyperscaler', component: HyperscalerComponent},
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
