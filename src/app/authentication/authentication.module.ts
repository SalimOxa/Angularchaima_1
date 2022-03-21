import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {RegistrationComponent} from './component/registration/registration.component';
import {SuccessRegistrationComponent} from './component/success-registration/success-registration.component';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ConfirmLinkComponent} from './component/confirm-Link/confirm-link.component';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CalendarModule} from 'primeng/calendar';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {DashboardModule} from '../dashboard/dashboard.module';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {ConfirmByPhoneNumberComponent} from './component/confirm-by-phone-number/confirm-by-phone-number.component';
import {CheckboxModule} from 'primeng/checkbox';
import {TopBarAuthenticationComponent} from './component/top-bar-authentication/top-bar-authentication.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    RegistrationComponent,
    SuccessRegistrationComponent,
    ConfirmLinkComponent,
    ConfirmByPhoneNumberComponent,
    TopBarAuthenticationComponent
  ],
  imports: [
    CommonModule, BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    MessageModule,
    PasswordModule,
    InputTextModule, FormsModule, InputMaskModule, KeyFilterModule,
    DialogModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    SharedModuleModule,
    ReactiveFormsModule,
    CalendarModule,
    DashboardModule,
    Ng2TelInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }), CheckboxModule, OverlayPanelModule, GooglePlaceModule
  ]
})
export class AuthenticationModule {
}
