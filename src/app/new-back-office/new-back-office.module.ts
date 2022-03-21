import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboadComponent} from './components/dashboad/dashboad.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {NewBackOfficeRoutingModule} from './new-back-office-routing.module';
import {HeaderBackOfficeComponent} from './components/header-back-office/header-back-office.component';
import {NewUserComponent} from './components/new-user/new-user.component';
import {ToastModule} from 'primeng/toast';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PanelModule} from 'primeng/panel';
import {MessageModule} from 'primeng/message';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../authentication/authentication.module';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {TableModule} from 'primeng/table';
import {NewProjectComponent} from './project-mangement/new-project/new-project.component';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';
import {ListProjectComponent} from './project-mangement/list-project/list-project.component';
import {NewServiceComponent} from './components/service-management/new-service/new-service.component';
import {ListeServiceComponent} from './components/service-management/liste-service/liste-service.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {OrderListModule} from 'primeng/orderlist';
import {ListCustomerComponent} from './components/list-customer/list-customer.component';
import {ListProjectWithoutAdminComponent} from './project-mangement/list-project-without-admin/list-project-without-admin.component';
import {DashboardSuperMasterComponent} from './components/super-master/dashboard-super-master/dashboard-super-master.component';
import {NewUserSuperMasterComponent} from './components/super-master/new-user-super-master/new-user-super-master.component';
import {ListUserSuperMasterComponent} from './components/super-master/list-user-super-master/list-user-super-master.component';
import {InputTextModule} from 'primeng/inputtext';
import {AdminsWithoutMasterComponent} from './components/super-master/admins-without-master/admins-without-master.component';
import {UpdateProjectAdminComponent} from './components/update-project-admin/update-project-admin.component';
import {ListMasterComponent} from './components/super-master/list-master/list-master.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {DeatilsProjectPaymentComponent} from './project-mangement/deatils-project-payment/deatils-project-payment.component';
import {IncoiceComponent} from './components/incoice/incoice.component';
import {FieldsetModule} from 'primeng/fieldset';
import {NewPartnerComponent} from './components/partners/new-partner/new-partner.component';
import {ListPartnersComponent} from './components/partners/list-partners/list-partners.component';
import {ListIncvoicesComponent} from './project-mangement/list-incvoices/list-incvoices.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PaginatorModule} from 'primeng/paginator';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {ListNotficationrBackOfficeComponent} from './components/list-notficationr-back-office/list-notficationr-back-office.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {InputNumberModule} from 'primeng/inputnumber';


@NgModule({
  declarations: [
    DashboadComponent,
    HeaderBackOfficeComponent,
    NewUserComponent,
    UserManagementComponent,
    NewProjectComponent,
    ListProjectComponent,
    NewServiceComponent,
    ListeServiceComponent,
    ListCustomerComponent,
    ListProjectWithoutAdminComponent,
    DashboardSuperMasterComponent,
    NewUserSuperMasterComponent,
    ListUserSuperMasterComponent,
    AdminsWithoutMasterComponent,
    UpdateProjectAdminComponent,
    ListMasterComponent,
    DeatilsProjectPaymentComponent,
    ListIncvoicesComponent,
    IncoiceComponent,
    DeatilsProjectPaymentComponent,
    NewPartnerComponent,
    ListPartnersComponent,
    ListNotficationrBackOfficeComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    NewBackOfficeRoutingModule,
    ToastModule,
    BreadcrumbModule,
    PanelModule,
    MessageModule,
    ReactiveFormsModule,
    CalendarModule,
    PasswordModule,
    DialogModule,
    InputTextModule,
    RadioButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TableModule,
    CardModule,
    DropdownModule,
    TooltipModule,

    FormsModule,
    PdfViewerModule,
    OrderListModule,
    OverlayPanelModule,
    Ng2TelInputModule,
    NgxSpinnerModule,
    ProgressSpinnerModule,
    PaginatorModule,
    SharedModuleModule,
    InfiniteScrollModule,
    InputNumberModule,
  ], providers: [MessageService]
})
export class NewBackOfficeModule {
}
