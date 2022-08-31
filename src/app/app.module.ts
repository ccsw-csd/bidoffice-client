import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { OfferModule } from './offer/offer.module';
import { AdminModule } from './admin/admin.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

registerLocaleData(localeEs, 'es');

export function HttpLoeaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/calendar/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    OfferModule,
    AdminModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoeaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
