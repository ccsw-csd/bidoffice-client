import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { OfferModule } from './offer/offer.module';
import { AdminModule } from './admin/admin.module';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';
import { GeneralConfirmationService } from './core/services/general-confirmation.service';


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
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    DialogService,
    MessageService,
    ConfirmationService,
    RefreshTokenResolverService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
