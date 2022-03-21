import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MenubarModule} from 'primeng/menubar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicesComponent} from './components/list-services/services.component';
import {CardModule} from 'primeng/card';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {ToolbarModule} from 'primeng/toolbar';
import {MapComponent} from './components/mapRacine/map.component';
import {AboutComponent} from './components/about/about.component';
import {RightsReservedComponent} from './components/footer/rights-reserved/rights-reserved.component';
import {AddressesComponent} from './components/footer/addresses/addresses.component';
import {ButtonModule} from 'primeng/button';
import {SlideMenuModule} from 'primeng/slidemenu';
import {DialogModule} from 'primeng/dialog';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Banner1Component} from './components/Banner1/Banner1.component';
import {HomeComponent} from './components/home/home.component';
import {Banner2Component} from './components/Banner2/Banner2.component';

import {CardComponent} from './components/card/card.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MarqueeComponent} from './components/marquee/marquee.component';
import {ServiceComponent} from './components/service/service.component';
import {GalleriaModule} from 'primeng/galleria';
import {ContactRacineComponent} from './components/contact-racine/contact-racine.component';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {PartnershipsComponent} from './components/partnerships/partnerships.component';
import {TermsAndConditionComponent} from './components/terms-and-condition/terms-and-condition.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}


@NgModule({
  declarations: [
    DashboardComponent,
    ServicesComponent,
    RightsReservedComponent,
    AddressesComponent,
    MapComponent,
    AboutComponent,

    Banner1Component,
    HomeComponent,
    Banner2Component,
    CardComponent,
    MarqueeComponent,
    ServiceComponent,
    ContactRacineComponent,
    PartnershipsComponent,
    TermsAndConditionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    SlideMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToolbarModule,
    SlideMenuModule,
    DialogModule,
    ReactiveFormsModule,
    MessageModule,
    KeyFilterModule,
    OverlayPanelModule,
    SplitButtonModule,
    GalleriaModule,
    CascadeSelectModule,
    DropdownModule,
    ToastModule


  ], providers: [MessageService],
  exports: [
    RightsReservedComponent
  ]


})
export class DashboardModule {
}
