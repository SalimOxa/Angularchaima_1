import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotficationUser} from '../../../common/notficationUser';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';

@Component({
  selector: 'app-list-notfication',
  templateUrl: './list-notfication.component.html',
  styleUrls: ['./list-notfication.component.scss']
})
export class ListNotficationComponent implements OnInit {

  @Input() lisNotification: any[] = [];
  @Input() op: any
  @Output() closeListComment = new EventEmitter();
  @Output() moreNotfication = new EventEmitter();
  user: any;
  numberNotficationOnlist = 6;
  numberNewNotfication: number = 0;
  showSpinner = false;

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
      this.route.navigate(['/profile/list-project'])
    } else {
      this.route.navigate(['/profile/etat-project', notification.idProject]);
      this.profileUserService.sendIdProjectForNotification(notification.idProject);


    }
    if (notification.isShowed === true) {

      this.profileUserService.updateEtatNotificationToShowed(notification.id).subscribe(
        (resp) => {

          this.getNotications();
        },
        (err) => {


        }
      );
    }
    this.closeListComment.emit(this.op);
  }

  getNotications() {
    this.profileUserService.getNotficationsByUserPage(this.user.sub, this.numberNotficationOnlist).subscribe(
      (resp) => {
        // @ts-ignore
        resp.sort((notification1, notification2) => notification2.id - notification1.id);
        this.lisNotification = resp.notifications;
        this.numberNewNotfication = resp.totalNotifIsNotShowed
      },
      (err) => {


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
