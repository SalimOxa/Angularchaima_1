import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {NotficationUser} from '../../../common/notficationUser';
import {Project} from '../../../shared-module/model/project';

@Component({
  selector: 'app-list-notficationr-back-office',
  templateUrl: './list-notficationr-back-office.component.html',
  styleUrls: ['./list-notficationr-back-office.component.scss']
})
export class ListNotficationrBackOfficeComponent implements OnInit {
  @Input() lisNotification: any[] = [];
  @Input() op: any
  @Output() closeListComment = new EventEmitter();
  @Output() moreNotfication = new EventEmitter();
  user: any;
  numberNotficationOnlist = 6;
  numberNewNotfication: number = 0;
  showSpinner = false;
  project: Project = {}


  constructor(private route: Router,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService, private router: Router, private userStore: UserStoreService) {
  }

  ngOnInit(): void {
    this.user = this.userStoreService.parseJWT();
  }

  viewNotification(notification: NotficationUser, event: any) {


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
    this.closeListComment.emit(this.op);

  }

  getNotications() {

    this.profileUserService.getNotficationsByUserPage(this.user.sub, this.numberNotficationOnlist).subscribe(
      (resp) => {

        this.lisNotification = resp.notifications;
        this.numberNewNotfication = resp.totalNotifIsNotShowed
      }
    );

  }


  onScrollDown(ev: any) {
    this.showSpinner = true;
    this.numberNotficationOnlist = this.numberNotficationOnlist + 5;

    setTimeout(() => {
      this.showSpinner = false;
      this.moreNotfication.emit(this.numberNotficationOnlist);
    }, 1000);

  }

  onScrollUp(ev: any) {
    console.log('scrolled up!', ev);

  }

  // Not Implementé
  clicked() {
    this.numberNewNotfication = 0;

  }


}
