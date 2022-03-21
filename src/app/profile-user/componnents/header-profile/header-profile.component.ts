import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {Subscription} from 'rxjs';
import {ProfileUserService} from '../../service/profile-user.service';
import {UserDto} from '../../../common/user-dto';
import {NotficationUser} from '../../../common/notficationUser';
import {MenuItem, MessageService} from 'primeng/api';
import {StompService} from '../../../shared-module/services/stomp.service';

// test
@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {
  user: any;
  subscription?: Subscription;

  newUserName: string = '';
  lisNotification: NotficationUser[] = [];
  numberNewNotfication: number = 0;
  numberNotfictaionOnlist = 6;
  items: MenuItem[] = [];
  currentUser: UserDto = {}
  visibleSidebar1: any;

  constructor(private route: Router,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService, private router: Router, private userStore: UserStoreService, private stompService: StompService, private messageService: MessageService) {

    this.user = this.userStoreService.parseJWT();
    this.getNotications();

    this.stompService.subscribe(`/topic/${this.user.sub}`, () => {
      this.profileUserService.getNotficationsByUserPage(this.user.sub, this.numberNotfictaionOnlist).subscribe(
        (resp) => {
          this.lisNotification = resp.notifications;
          this.numberNewNotfication = resp.totalNotifIsNotShowed
          const last = this.lisNotification[0];
          this.messageService.add({key: 'bc', icon: 'pi pi-bell', summary: last.name, detail: last.message});
        }
      );


    });
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'My Profile',
        icon: 'pi pi-fw pi-home',
        command: (click) => {
          this.visibleSidebar1 = false,
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
              this.visibleSidebar1 = false,
                this.router.navigate(['/profile/list-project']);
            }
          },
          {
            label: 'New Project', icon: 'pi pi-fw pi-plus',
            command: (click) => {
              this.visibleSidebar1 = false,
                this.router.navigate(['/profile/new-project']);
            }

          }
        ]
      },
      {
        label: 'My Documents',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'List Documents',
            icon: 'pi pi-pi pi-bars',
            command: (click) => {
              this.visibleSidebar1 = false,
                this.router.navigate(['/profile/list-documents']);


            }
          },
          {
            label: 'New Document',
            icon: 'pi pi-pi pi-plus',
            command: (click) => {
              this.visibleSidebar1 = false,
                this.router.navigate(['/profile/new-document']);


            }
          }
        ]
      },
      {
        label: 'Payment ',
        icon: 'pi pi-credit-card',
        command: (click) => {
          this.visibleSidebar1 = false,
            this.router.navigate(['/profile/listProjectPayement']);
        }
      },
      {
        label: 'Return to Site ',
        icon: 'pi pi-fw pi-globe',
        command: (click) => {
          this.visibleSidebar1 = false
          this.router.navigate(['/dashboard/home']);
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: (click) => {
          this.visibleSidebar1 = false,
            this.userStore.logout();
          this.router.navigate(['']);
        }

      }
    ];


    this.profileUserService.getUser(this.user.email).subscribe(response => {
      this.currentUser = response;


    })
    this.newUserName = this.user.name
    this.subscription = this.profileUserService.getName().subscribe(res => {
      this.currentUser.username = res;


    })


  }


  getNotications() {

    this.profileUserService.getNotficationsByUserPage(this.user.sub, this.numberNotfictaionOnlist).subscribe(
      (resp) => {

        this.lisNotification = resp.notifications;
        this.numberNewNotfication = resp.totalNotifIsNotShowed
      }
    );

  }

  logout() {
    this.route.navigate(['/register']);
    this.userStoreService.logout()
  }

  clicked() {
    this.numberNewNotfication = 0;

  }


  goProfile() {
    this.route.navigate(['/profile/myProfile']);
  }

  closeListComment(op: any) {
    op.hide(event);
  }

  moreNotfication(numberNotfication: any) {
    this.numberNotfictaionOnlist = numberNotfication;
    this.getNotications();
  }


}


