import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { OfferModule } from './offer/offer.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FileTypeComponent } from './admin/file-type/file-type.component';
import { AdminModule } from './admin/admin.module';

registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
    //FileTypeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    OfferModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
