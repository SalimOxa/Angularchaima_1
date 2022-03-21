import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.css']
})
export class DashboadComponent implements OnInit {

  items: MenuItem[] = [];
  display = false;
  user: any
  nameUser = ''

  constructor(private router: Router, private userStoreService: UserStoreService, private userStore: UserStoreService, private messageService: MessageService,) {

  }

  // @ts-ignore
  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT()
    if (this.user !== undefined) {
      if (this.user.roles[0] === 'MASTER') {
        this.items = [
          {
            label: 'Administration',
            icon: 'pi pi-fw pi-home',

          },
          {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
            items: [{
              label: 'New User',
              icon: 'pi pi-fw pi-user-plus',
              command: (click) => {
                this.router.navigate(['/new-back-office/dashboard/new-app-user']);
              },

            },
              {
                label: 'Admins List',
                icon: 'pi pi-fw pi-users',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-users']);
                },
              }, {
                label: 'Customers List',
                icon: 'pi pi-fw pi-users',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-customers']);
                },
              }

            ]
          },
          {
            label: 'Projects',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'New Project', icon: 'fas fa-plus',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/new-project']);
                }
              },

              {
                label: 'List Project With Admin',
                icon: 'fas fa-list',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-project']);
                }
              }, {
                label: 'List Project Without Admin',
                icon: 'fas fa-list',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-project-without-admin']);
                }
              }
            ]
          },

          {
            label: 'Services',
            icon: 'pi pi-fw pi-file',
            items: [
              {
                label: 'New Service',
                icon: 'fas fa-plus',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/new-service']);
                }
              },
              {
                label: 'List Services',
                icon: 'fas fa-list',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-service']);
                }
              }
            ]
          },
          {
            label: 'Partners',
            icon: 'far fa-handshake',
            items: [
              {
                label: 'New Partner',
                icon: 'fas fa-plus',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/new-partner']);
                }
              },
              {
                label: 'Partners List',
                icon: 'fas fa-list',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-partners']);
                }
              }
            ]
          },

          {
            label: 'Payment',
            icon: 'fas fa-file-invoice-dollar',
            command: (click) => {
              this.router.navigate(['/new-back-office/dashboard/list-invoices']);
            }
          },
          {
            label: 'access the site',
            icon: 'pi pi-fw pi-globe',
            command: (click) => {
              this.router.navigate(['/dashboard']);
            }
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: (click) => {
              this.userStore.logout();
              this.router.navigate(['/register']);
            }

          }
        ];
      } else if (this.user.roles[0] === 'ADMIN') {
        this.items = [
          {
            label: 'Administration',
            icon: 'pi pi-fw pi-home',

          },
          {
            label: 'User Management',
            icon: 'pi pi-fw pi-users',
            items: [{
              label: 'New User',
              icon: 'pi pi-fw pi-user-plus',
              command: (click) => {
                this.router.navigate(['/new-back-office/dashboard/new-app-user']);
              }

            },
              {
                label: 'Users List',
                icon: 'pi pi-fw pi-users',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-users']);
                }
              },

            ]
          },
          {
            label: 'Project Management',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'New Project', icon: 'fas fa-plus',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/new-project']);
                }
              },

              {
                label: 'List Project',
                icon: 'fas fa-list',
                command: (click) => {
                  this.router.navigate(['/new-back-office/dashboard/list-project']);
                }
              }
            ]
          },
          {
            label: 'access the site',
            icon: 'pi pi-fw pi-globe',
            command: (click) => {
              this.router.navigate(['/dashboard']);
            }
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: (click) => {
              this.userStore.logout();
              this.router.navigate(['/register']);
            }

          }
        ];
      }
    } else {
      this.user = null
      this.items = [
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

  showBottomCenter() {
    this.messageService.add({key: 'bc', severity: 'info', summary: 'Info', detail: 'Message Content'});
  }
}
