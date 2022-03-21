import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';
import {UserDto} from '../../../common/user-dto';
import {Project} from '../../../shared-module/model/project';
import {NgxSpinnerService} from 'ngx-spinner';
import {StompService} from '../../../shared-module/services/stomp.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  items: MenuItem[] = [];
  home: any;
  user: any;
  userDto: UserDto = {};
  userDtoUpdatedForNotfication: UserDto = {};

  displayEditPasswordPoupup: boolean = false;
  first = 0;
  rows = 5;
  changePassword: boolean = false;
  validPassword: boolean = false;
  PasswordToValidate: string = ''
  password: any;
  newPassword: string = '';
  retypePassword: string = ''
  validateEdit: boolean = true;
  displayPasswordPoupup: boolean = false;
  changeOrAddPhone: boolean = false;
  prefixNumber: string = ''
  isDashboard: boolean = true;
  projects: Project[] | undefined = [];
  // @ts-ignore
  cols: any[];
  chargement = false;

//
  displayEditFild = false;
  isChangePassword = false;
  nameEdit: any;
  textEdit: any;
  previousValueEdit: any;
  subscription?: Subscription;

  constructor(private route: Router,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private messageService: MessageService,
              private spinner: NgxSpinnerService, private stompService: StompService) {
    this.user = this.userStoreService.parseJWT();
    this.getUser();
  }

  ngOnInit(): void {

    this.subscription = this.stompService.getName().subscribe(res => {
        if (res === 'profile_type') {
          setTimeout(() => {
            this.getUser();
          }, 1000);
        }
      }
    )

    this.items = [
      {label: 'My Profile'}
    ];


    this.home = {icon: 'pi pi-home'};
    this.geProjectDocument();
    this.cols = [
      {field: 'NUMERO', header: 'NUMERO'},
      {field: 'DATE EXPIRATION', header: 'DATE EXPIRATION'},
      {field: 'UPLOAD DOCUMENT', header: 'UPLOAD DOCUMENT'},

    ];
  }


  getUser() {
    this.spinner.show();

    this.profileUserService.getUser(this.user.email).subscribe(
      (resp) => {
        this.spinner.hide();
        this.userDto = resp;


      },
      (err) => {

      }
    );

  }

  geProjectDocument() {
    this.profileUserService.getUser(this.user.email).subscribe((response) => {
      // @ts-ignore
      this.projects = response.projects;
    })

  }

  showDialogEditUser() {
    this.isChangePassword = true;
    this.displayPasswordPoupup = true;
  }


  testValidPassword(password: any) {
    this.profileUserService
      .getPasswordExist(password, this.user.sub).subscribe((response) => {
      if (response === false) {
        this.validPassword = false;
      } else {
        this.validPassword = true;
      }
    });
  }

  resetPoupap() {
    this.validPassword = false;
    this.changePassword = false;
    this.password = '';
    this.newPassword = '';
    this.retypePassword = ''
  }


  sendName(): void {
    // send message to subscribers via observable subject
    this.profileUserService.sendName(this.userDto.username);
  }


  hasChangePassword() {
    this.changePassword = true;
    this.changeOrAddPhone = false;

  }

  hasChangeOrAddPhone() {
    this.changeOrAddPhone = true;
    this.changePassword = false;
  }


  private showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'toast',
      severity,
      summary,
      detail,
    });
  }


  detailProject() {
    this.route.navigate(['/profile/etat-project']);

  }

  notMatch() {
    if (this.newPassword === this.retypePassword) {
      this.validateEdit = true;
      this.userDto.password = this.retypePassword;
    } else {
      this.validateEdit = false;

    }
  }

  editPassword() {
    this.notMatch();
    if (this.validateEdit === false || this.validPassword === true) {
      return;
    }
    this.profileUserService.saveChanges(this.userDto).subscribe(
      (resp) => {
        this.showToast('success', 'Good Job', 'Your Password was updated Successfully');
        // this.getUser();
        this.displayEditPasswordPoupup = false;
        // this.sendName()
      }
    );
  }


  validatePassword() {
    this.profileUserService
      .getPasswordExist(this.PasswordToValidate, this.user.sub)
      .subscribe((response) => {
        if (response === false) {
          this.validPassword = true;
        } else {
          this.validPassword = false;
          this.displayPasswordPoupup = false;
          if (this.isChangePassword === true) {
            this.displayEditFild = false;
            this.displayEditPasswordPoupup = true;
          } else {
            this.displayEditPasswordPoupup = false;
            this.displayEditFild = true;

          }

          this.userDto.password = this.PasswordToValidate;
        }
      }, error => {
        this.validPassword = true;
      });
  }

  edit(name: any, editattribute: any) {
    this.isChangePassword = false;
    this.nameEdit = name;
    this.textEdit = editattribute;
    this.displayPasswordPoupup = true;

  }

  editFild() {
    this.profileUserService.saveChanges(this.userDto).subscribe(
      (resp) => {
        this.showToast('success', 'Good Job', 'Your Request was sended To the Administration');
        this.getUser();
        this.displayEditFild = false;
      }
    );
  }


  sendNotficationForUpdatingProfile(user: UserDto, nameEdit: string, textEdit: any, previousValueEdit: any) {
    this.profileUserService.sendNotficationForUpdatingProfile(user, nameEdit, textEdit, previousValueEdit).subscribe(
      (resp) => {
        if (resp === false) {
          this.showToast('success', 'Good Job', 'Your Request was sended To the Administration');
        } else {
          this.profileUserService.saveChanges(this.userDtoUpdatedForNotfication).subscribe(
            (resp) => {
              console.log('nerm')
              this.showToast('success', 'Good Job', 'Your Profile has Updated Succefully');
              this.getUser();

            }
          );

        }
      }
    );

  }


  updateFild(nameEdit: any, textEdit: any) {
    this.userDtoUpdatedForNotfication = {...this.userDto};
    switch (nameEdit) {
      case 'username':
        this.previousValueEdit = this.userDto.username;
        this.userDtoUpdatedForNotfication.username = textEdit;

        break;
      case 'firstName':
        this.previousValueEdit = this.userDto.firstName;
        this.userDtoUpdatedForNotfication.firstName = textEdit;


        break;
      case 'email':
        this.previousValueEdit = this.userDto.email;
        this.userDtoUpdatedForNotfication.email = textEdit;


        break;
      case 'phoneNumber':
        this.previousValueEdit = this.userDto.phoneNumber;
        this.userDtoUpdatedForNotfication.phoneNumber = textEdit;


        break;
      case 'company':
        this.previousValueEdit = this.userDto.company;
        this.userDtoUpdatedForNotfication.company = textEdit;

        break;

    }
    this.sendNotficationForUpdatingProfile(this.userDto, nameEdit, textEdit, this.previousValueEdit);
    this.displayEditFild = false;

  }
}
