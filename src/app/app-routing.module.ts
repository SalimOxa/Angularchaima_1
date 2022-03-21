import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfirmLinkComponent} from './authentication/component/confirm-Link/confirm-link.component';
import {RegistrationComponent} from './authentication/component/registration/registration.component';
import {SuccessRegistrationComponent} from './authentication/component/success-registration/success-registration.component';
import {ConfirmByPhoneNumberComponent} from './authentication/component/confirm-by-phone-number/confirm-by-phone-number.component';
import {ApplicationGuardGuard} from './shared-module/services/guard/application-guard.guard';
import {ServiceComponent} from './dashboard/components/service/service.component';
import {TermsAndConditionComponent} from './dashboard/components/terms-and-condition/terms-and-condition.component';
import {DashboardComponent} from './dashboard/components/dashboard/dashboard.component';


const routes: Routes = [

  {path: '', component: DashboardComponent},
  {path: 'register', component: RegistrationComponent},

  {path: 'confirmLink/:mail', component: ConfirmLinkComponent},
  {path: 'confirmByPhone/:mail', component: ConfirmByPhoneNumberComponent},
  {
    path: 'successRegistration/:codeConfirmation',
    component: SuccessRegistrationComponent,
  },
  {path: 'list-services/:id', component: ServiceComponent},
  {path: 'terms', component: TermsAndConditionComponent},

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile-user/profile-user.module').then(
        (module) => module.ProfileUserModule
      ),
    canActivate: [ApplicationGuardGuard]
  }, {
    path: 'new-back-office',
    loadChildren: () =>
      import('./new-back-office/new-back-office.module').then(
        (module) => module.NewBackOfficeModule
      ),


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
