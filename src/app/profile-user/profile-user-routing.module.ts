import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashbordUserComponent} from './componnents/dashbord-user/dashbord-user.component';
import {MyProfileComponent} from './componnents/my-profile/my-profile.component';
import {NewProjectComponent} from './componnents/new-project/new-project.component';
import {ListProjectComponent} from './componnents/list-project/list-project.component';
import {DashboardEtataProjectComponent} from './componnents/dashboard-etat-project/dashboard-etata-project.component';
import {NewDocumentComponent} from './componnents/new-document/new-document.component';
import {ListDocumentsComponent} from './componnents/list-documents/list-documents.component';
import {PaymentPayPalComponent} from './componnents/payment-pay-pal/payment-pay-pal.component';
import {ListPaymentProjectComponent} from './componnents/list-payment-project/list-payment-project.component';
import {ListTranchesPayementsComponent} from './componnents/list-tranches-payements/list-tranches-payements.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordUserComponent,
    children: [
      {
        path: 'myProfile',
        component: MyProfileComponent,
      },
      {
        path: 'new-project',
        component: NewProjectComponent,
      },
      {
        path: 'list-project',
        component: ListProjectComponent,
      }, {
        path: 'new-document',
        component: NewDocumentComponent,
      },
      {
        path: 'list-documents',
        component: ListDocumentsComponent,
      },
      {
        path: 'etat-project/:id',
        component: DashboardEtataProjectComponent,
      },

      {
        path: 'payment/:idTranche',
        component: PaymentPayPalComponent,
      },
      {
        path: 'paymentTask/:idTranche/:idTask',
        component: PaymentPayPalComponent,
      },
      {
        path: 'listProjectPayement',
        component: ListPaymentProjectComponent,
      },
      {
        path: 'listTranchesPayement/:idProject',
        component: ListTranchesPayementsComponent,
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileUserRoutingModule {
}
