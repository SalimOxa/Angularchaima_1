import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileUserRoutingModule} from './profile-user-routing.module';
import {DashbordUserComponent} from './componnents/dashbord-user/dashbord-user.component';
import {HeaderProfileComponent} from './componnents/header-profile/header-profile.component';
import {FooterProfileComponent} from './componnents/footer-profile/footer-profile.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MyProfileComponent} from './componnents/my-profile/my-profile.component';
import {NewProjectComponent} from './componnents/new-project/new-project.component';
import {DropdownModule} from 'primeng/dropdown';
import {ListProjectComponent} from './componnents/list-project/list-project.component';
import {DashboardEtataProjectComponent} from './componnents/dashboard-etat-project/dashboard-etata-project.component';
import {TimelineModule} from 'primeng/timeline';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {InplaceModule} from 'primeng/inplace';
import {AddCommentTaskComponent} from './componnents/ListTasks/add-comment-task/add-comment-task.component';
import {SendMailTaskComponent} from './componnents/ListTasks/send-mail-task/send-mail-task.component';
import {UploadFileTaskComponent} from './componnents/ListTasks/upload-file-task/upload-file-task.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SidebarModule} from 'primeng/sidebar';
import {RatingModule} from 'primeng/rating';
import {ListDocumentsComponent} from './componnents/list-documents/list-documents.component';
import {NewDocumentComponent} from './componnents/new-document/new-document.component';
import {PaymentPayPalComponent} from './componnents/payment-pay-pal/payment-pay-pal.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {ListPaymentProjectComponent} from './componnents/list-payment-project/list-payment-project.component';
import {ListTranchesPayementsComponent} from './componnents/list-tranches-payements/list-tranches-payements.component';

import {FieldsetModule} from 'primeng/fieldset';
import {NgxSpinnerModule} from 'ngx-spinner';
import {PayTranchTaskComponent} from './componnents/ListTasks/pay-tranch-task/pay-tranch-task.component';
import {DownoaldStatementTaskComponent} from './componnents/ListTasks/downoald-statement-task/downoald-statement-task.component';
import {ListNotficationComponent} from './componnents/list-notfication/list-notfication.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import { BadgeModule } from "primeng/badge";

@NgModule({
  declarations: [
    DashbordUserComponent,
    HeaderProfileComponent,
    FooterProfileComponent,
    MyProfileComponent,
    NewProjectComponent,
    ListProjectComponent,
    DashboardEtataProjectComponent,
    AddCommentTaskComponent,
    SendMailTaskComponent,
    UploadFileTaskComponent,
    ListDocumentsComponent,
    NewDocumentComponent,
    PaymentPayPalComponent,
    ListPaymentProjectComponent,
    ListTranchesPayementsComponent,
    PayTranchTaskComponent,
    DownoaldStatementTaskComponent,
    ListNotficationComponent,


  ],
  imports: [
    CommonModule,
    ProfileUserRoutingModule,
    InputTextModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    PanelMenuModule,
    DialogModule,
    ProgressSpinnerModule,
    MessageModule,
    CalendarModule,
    PasswordModule,
    BreadcrumbModule,
    PanelModule,
    ToastModule,
    DropdownModule,
    ReactiveFormsModule,
    TimelineModule,
    Ng2TelInputModule,
    NgxDocViewerModule,
    PdfViewerModule,
    InplaceModule,
    OverlayPanelModule,
    SidebarModule,
    RatingModule,
    NgxPayPalModule,
    FieldsetModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    SharedModuleModule,
     BadgeModule

  ], providers: [

    MessageService
  ],
})
export class ProfileUserModule {
}
