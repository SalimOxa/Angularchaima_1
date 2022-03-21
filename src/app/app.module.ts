import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {AuthenticationModule} from './authentication/authentication.module';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpInterceptorService} from './shared-module/services/interceptor.service';
import {MenubarModule} from 'primeng/menubar';
import {DashboardModule} from './dashboard/dashboard.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CommonModule} from '@angular/common';
import {ApplicationGuardGuard} from './shared-module/services/guard/application-guard.guard';
import {NgxPayPalModule} from 'ngx-paypal';
import {SpinnerModule} from 'primeng/spinner';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {StompService} from './shared-module/services/stomp.service';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    MessageModule,
    AuthenticationModule,
    PasswordModule,
    InputTextModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    MenubarModule,
    SpinnerModule,
    DashboardModule,
    NgxPayPalModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    GooglePlaceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ApplicationGuardGuard,
    StompService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
