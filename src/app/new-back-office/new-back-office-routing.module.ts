import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboadComponent} from './components/dashboad/dashboad.component';
import {NewUserComponent} from './components/new-user/new-user.component';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {NewProjectComponent} from "./project-mangement/new-project/new-project.component";
import {ListProjectComponent} from "./project-mangement/list-project/list-project.component";
import {ListCustomerComponent} from "./components/list-customer/list-customer.component";
import {NewServiceComponent} from "./components/service-management/new-service/new-service.component";
import {ListeServiceComponent} from "./components/service-management/liste-service/liste-service.component";
import {ListProjectWithoutAdminComponent} from "./project-mangement/list-project-without-admin/list-project-without-admin.component";
import {DashboardSuperMasterComponent} from "./components/super-master/dashboard-super-master/dashboard-super-master.component";
import {ListUserSuperMasterComponent} from "./components/super-master/list-user-super-master/list-user-super-master.component";
import {NewUserSuperMasterComponent} from "./components/super-master/new-user-super-master/new-user-super-master.component";
import {AdminsWithoutMasterComponent} from "./components/super-master/admins-without-master/admins-without-master.component";
import {UpdateProjectAdminComponent} from "./components/update-project-admin/update-project-admin.component";
import {ListMasterComponent} from "./components/super-master/list-master/list-master.component";
import {ApplicationGuardGuard} from '../shared-module/services/guard/application-guard.guard';
import {MyProfileComponent} from "../profile-user/componnents/my-profile/my-profile.component";
import {DeatilsProjectPaymentComponent} from './project-mangement/deatils-project-payment/deatils-project-payment.component';
import { ListIncvoicesComponent } from './project-mangement/list-incvoices/list-incvoices.component';
import { IncoiceComponent } from './components/incoice/incoice.component';
import {NewPartnerComponent} from './components/partners/new-partner/new-partner.component';
import {ListPartnersComponent} from './components/partners/list-partners/list-partners.component';

// @ts-ignore
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboadComponent,
    canActivate: [ApplicationGuardGuard],
    children: [
      {
        path: 'new-app-user',
        component: NewUserComponent,

      },{
        path: 'list-users',
        component: UserManagementComponent,

      },{
        path: 'list-customers',
        component: ListCustomerComponent,

      },

      {
        path: 'new-project',
        component:NewProjectComponent,

      },{

        path: 'list-project',
        component:ListProjectComponent,

      },{
        path: 'new-service',
        component:NewServiceComponent,

      },{

        path: 'list-service',
        component:ListeServiceComponent,

      },
      {

        path: 'list-invoices',
        component: ListIncvoicesComponent,

      }
      ,{

        path: 'new-partner',
        component: NewPartnerComponent,

      }, {

        path: 'list-partners',
        component: ListPartnersComponent,

      },{

        path: 'list-project-without-admin',
        component:ListProjectWithoutAdminComponent,

      },{
        path: 'update-project/:id',
        component: UpdateProjectAdminComponent,

      },{
        path: 'detail-payment-project/:idProject',
        component: DeatilsProjectPaymentComponent,

      }
      ]},
  {
   path: 'dashboard-super-master',
    component: DashboardSuperMasterComponent,
    children: [
      {
        path: 'new-app-user',
        component: NewUserSuperMasterComponent,

      },{
        path: 'list-users',
        component: ListUserSuperMasterComponent,

      }

      ,{
        path: 'list-admins',
        component: AdminsWithoutMasterComponent,

      }, {
        path: 'list-master',
        component: ListMasterComponent,

      },
      ]

  },

  {

    path: 'invoice/:id',
    component:IncoiceComponent,

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewBackOfficeRoutingModule {


}
