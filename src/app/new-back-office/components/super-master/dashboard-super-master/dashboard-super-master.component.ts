import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {UserStoreService} from "../../../../authentication/stores/user-store/user-store.service";

@Component({
  selector: 'app-dashboard-super-master',
  templateUrl: './dashboard-super-master.component.html',
  styleUrls: ['./dashboard-super-master.component.css']
})
export class DashboardSuperMasterComponent implements OnInit {
  items: MenuItem[] = [];



  constructor(private router: Router,
        ) {
  }

  ngOnInit() {


    this.items= [
      {
        label: 'Administration',
        icon: 'pi pi-fw pi-home',

      },
      {
        label: 'New User',
        icon: 'pi pi-fw pi-user-plus',
        command: (click) => {
          this.router.navigate(['/new-back-office/dashboard-super-master/new-app-user']);
        }

      },
      {
        label: 'Masters List',
        icon: 'pi pi-fw pi-users',
        command: (click) => {
          this.router.navigate(['new-back-office/dashboard-super-master/list-master']);
        }
      }, {
        label: 'admins List ',
        icon: 'pi pi-fw pi-users',
        command: (click) => {
          this.router.navigate(['new-back-office/dashboard-super-master/list-admins']);
        }
      },
      {
        label: 'Customers List',
        icon: 'pi pi-fw pi-users',
        command: (click) => {
          this.router.navigate(['new-back-office/dashboard-super-master/list-users']);
        }
      },


    ]

  }

}
