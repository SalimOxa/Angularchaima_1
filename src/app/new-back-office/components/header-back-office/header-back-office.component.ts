import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {NotficationUser} from '../../../common/notficationUser';
import {Project} from '../../../shared-module/model/project';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {UserDto} from '../../../common/user-dto';
import {StompService} from '../../../shared-module/services/stomp.service';


@Component({
  selector: 'app-header-back-office',
  templateUrl: './header-back-office.component.html',
  styleUrls: ['./header-back-office.component.scss']
})
export class HeaderBackOfficeComponent implements OnInit {
  user: any
  nameUser = ''

  listNotification: NotficationUser[] = [];
  numberNewNotfication = 0;
  param = '';
  project: Project = {}
  updateUser: UserDto = {}
  isLoding = false;
  haveNotficationForClear = false;


  constructor(private router: Router,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private newBackOfficesService: NewBackOfficeService,
              private stompService: StompService) {
    this.user = this.userStoreService.parseJWT()

    this.getNotications()
  }

  ngOnInit(): void {

    this.stompService.subscribe(`/topic/${this.user.sub}`, (): void => {

      this.getNotications()
      // window.location.reload();

    });

    if (this.user === null) {
      this.nameUser = 'super Master'
    } else {


      if (this.user.roles[0] === 'MASTER') {
        this.nameUser = 'Master Profile'

      } else if (this.user.roles[0] === 'ADMIN') {
        this.nameUser = 'Admin Profile'
      }
    }


  }


  getNotications() {
    this.isLoding = true;
    this.newBackOfficesService.getNotficationsByUser(this.user.sub).subscribe(
      (resp) => {
        // @ts-ignore
        resp.sort((notification1, notification2) => notification2.id - notification1.id);
        this.listNotification = resp;
        this.getNumberNotificationNotShowed();
        this.isLoding = false;


      },
      (err) => {
        console.log(err);

      }
    );

  }

  // test
  logout() {
    this.router.navigate(['/register']);
    this.userStoreService.logout()
  }


  viewNotification(notification: NotficationUser, op: any, event: any) {


    if (notification.typeNotification === 'has updated her profile') {

    } else if (notification.typeNotification === 'Delete Project') {
      if (this.user.roles[0] === 'ADMIN') {
        this.router.navigate(['/new-back-office/dashboard/list-project'])
      } else {
        this.router.navigate(['/new-back-office/dashboard/list-project-without-admin'])
      }
    } else {
      this.profileUserService.getProjectById(notification.idProject).subscribe(
        (resp) => {
          this.project = resp

          if (this.project.tasks?.length === 0) {
            this.router.navigate(['/new-back-office/dashboard/list-project-without-admin']);
          } else {
            this.router.navigate(['/new-back-office/dashboard/update-project/', notification.idProject]);
          }
        }
      )

      this.profileUserService.sendIdProjectForNotification(notification.idProject);


    }
    if (notification.isShowed === true) {

      this.profileUserService.updateEtatNotificationToShowed(notification.id).subscribe(
        (resp) => {
          console.log(resp);
          this.getNotications();

        },
        (err) => {
          console.log(err);


        }
      );
    }
    op.hide(event)

  }

  getNumberNotificationNotShowed() {
    let i = 0;
    this.listNotification.forEach(element => {
      if (element.isShowed === true) {
        i++;
      }
    });
    this.numberNewNotfication = i;
    if (this.numberNewNotfication > 0) {
      this.haveNotficationForClear = true;
    }

  }

  clickedNotification() {
    this.numberNewNotfication = 0;
  }

  approveUpdate(notification: NotficationUser) {
    this.newBackOfficesService.getUser(notification.idCustommer).subscribe(res => {
      this.updateUser = res
      this.UpdateProfile(notification.nameField, notification.updatedValue)
      notification.approved = true;
      this.newBackOfficesService.sendNotficationForApproved(notification, this.user.sub).subscribe(res => {

        this.getNotications();

      })
    })

  }


  UpdateProfile(nameFieldUpdate: string | undefined, updatedValue: string | undefined) {
    switch (nameFieldUpdate) {
      case 'username':
        this.updateUser.username = updatedValue;
        break;
      case 'firstName':
        this.updateUser.firstName = updatedValue;

        break;
      case 'email':
        this.updateUser.email = updatedValue;

        break;
      case 'phoneNumber':
        this.updateUser.phoneNumber = updatedValue;

        break;
      case 'company':
        this.updateUser.company = updatedValue;
        break;
    }

    this.profileUserService.updateProfile(this.updateUser).subscribe(
      (resp) => {

      },
    )

  }


  showUnreadNotification() {
    this.isLoding = true;
    this.listNotification = [];
    this.newBackOfficesService.getUnreadNotifactionsByUser(this.user.sub).subscribe(res => {
      this.listNotification = res
      this.isLoding = false;

    })
  }

  showAllUnreadNotification() {
    this.isLoding = true;
    this.listNotification = [];
    this.newBackOfficesService.showAllUnreadNotfication(this.user.sub).subscribe(res => {
      this.getNotications();
      this.haveNotficationForClear = false;
      this.isLoding = false;

    })
  }
}
