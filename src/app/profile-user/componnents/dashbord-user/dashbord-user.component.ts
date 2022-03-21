import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.scss']
})
export class DashbordUserComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router,
              private userStore: UserStoreService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'My Profile',
        icon: 'pi pi-fw pi-home',
        command: (click) => {
          this.router.navigate(['/profile/myProfile']);
        }
      },
      {
        label: 'My Project',
        icon: 'pi pi-fw pi-list',
        items: [
          {
            label: 'List Project', icon: 'pi pi-fw pi-book',
            command: (click) => {
              this.router.navigate(['/profile/list-project']);
            }
          },
          {
            label: 'New Project', icon: 'pi pi-fw pi-plus',
            command: (click) => {
              this.router.navigate(['/profile/new-project']);
            }

          }
        ]
      },
      {
        label: 'My Document',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'List Document',
            icon: 'pi pi-pi pi-bars',
            command: (click) => {
              this.router.navigate(['/profile/list-documents']);
            }
          },
          {
            label: 'New Document',
            icon: 'pi pi-pi pi-plus',
            command: (click) => {
              this.router.navigate(['/profile/new-document']);
            }

          }
        ]
      },
      {
        label: 'Payment ',
        icon: 'pi pi-credit-card\n',
        command: (click) => {
          this.router.navigate(['/profile/listProjectPayement']);
        }
      },
      {
        label: 'Return to Site ',
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
          this.router.navigate(['']);
        }

      }
    ];
  }

}
