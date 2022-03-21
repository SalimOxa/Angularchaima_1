import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {MapComponent} from './components/mapRacine/map.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ServicesComponent} from './components/list-services/services.component';
import {HomeComponent} from './components/home/home.component';
import {ServiceComponent} from './components/service/service.component';
import {PartnershipsComponent} from './components/partnerships/partnerships.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'services',
        component: ServicesComponent,

      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: MapComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'partner',
        component: PartnershipsComponent,
      },

      {path: 'list-services/:id', component: ServiceComponent},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
