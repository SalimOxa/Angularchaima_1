import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserDto} from '../../../common/user-dto';
import {AuthenticationService} from '../../service/authentication.service';
import {UserStoreService} from '../../stores/user-store/user-store.service';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../../models/authentication-request';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Role_dto} from '../../../common/role_dto';
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../../dashboard/service/dhashboard.service';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Options} from 'ngx-google-places-autocomplete/objects/options/options';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {


  subscription?: Subscription;
  selectLang: any = '';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    firstname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    retypePassword: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    checkcompany: new FormControl(),
    company: new FormControl(),
  });
  formLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });

  isLogin = true;
  errorMessages = '';
  userDto: UserDto = {};
  loginRequest: AuthenticationRequest = {};
  telephoneNumber = '';
  prefixNumber = ''
  dateNaissance: Date = new Date('2005-03-27')
  invalidAge = false;
  InvalidRetypePassword = false;
  userExist = false;
  internetConnection = false;
  incorrectLogin = false;
  allField = false;
  roleDto: Role_dto = {};
  chargement = false;
  errorLogin = false;
  enabledAccount = false;
  desactivateAccount = false;
  isCompany = false;
  retypePassword: string = '';

  /*
    options = {
      types: ['address'],
      componentRestrictions: {country: ['ca']}
    } as unknown as Options;*/

  constructor(
    private authenticationService: AuthenticationService,
    private userStore: UserStoreService,
    private route: Router,
    private dashboardService: DhashboardService
  ) {
    this.selectLang = localStorage.getItem('lang');

  }


  ngOnInit(): void {
    this.selectLang = localStorage.getItem('lang');

    this.subscription = this.dashboardService.getLanguage().subscribe(res => {

      this.selectLang = res;
    })


  }

  get f() {

    return this.form.controls;
  }

  get fLogin() {
    return this.formLogin.controls;
  }

  register() {
    this.errorMessages = '';
    if (this.form.invalid || this.invalidAge) {
      this.allField = true;
      setTimeout(() => {
        this.allField = false;
      }, 5000);
      return;
    }
    if (this.userDto.password !== this.retypePassword) {
      this.InvalidRetypePassword = true
      return;
    }
    this.userDto.phoneNumber = '+' + this.prefixNumber + this.telephoneNumber;
    this.chargement = true;
    this.roleDto.roleName = 'CUSTOMER'
    this.userDto.roles = [this.roleDto]
    this.authenticationService.register(this.userDto).subscribe(
      (res) => {
        this.route.navigate(['/confirmLink', this.userDto.email]);
        this.chargement = false;

      },
      (error) => {
        console.log(error.status)
        if (error.status === 408) {
          this.internetConnection = true;
          console.log('internet connection problem')
        } else {
          this.userExist = true;
        }
        this.chargement = false;

      }
    );
  }

  logIn() {
    this.errorMessages = '';
    if (this.formLogin.invalid) {

      this.allField = true;
      setTimeout(() => {
        this.allField = false;

      }, 5000);

      return;
    }
    this.authenticationService.logIn(this.loginRequest).subscribe(
      (res) => {
        const jwt = res.headers.get('authorization');
        const user = this.userStore.parseForLogin(jwt);
        if (user.isActivated === false && user.roles[0] === 'CUSTOMER') {
          this.chargement = false;
          this.desactivateAccount = true;
          return;
        }
        if (user.isEnabled === false) {
          this.chargement = false;
          this.enabledAccount = true;
          return;
        }

        this.userStore.setAccessToken(jwt);
        if (user.roles[0] === 'MASTER') {
          this.route.navigate(['/new-back-office/dashboard/list-project-without-admin']);
        } else if (user.roles[0] === 'ADMIN') {
          this.route.navigate(['/new-back-office/dashboard/list-project']);

        } else if (user.roles[0] === 'SUPERMASTER') {
          this.route.navigate(['/new-back-office/dashboard-super-master/list-admins']);
        } else if (user.roles[0] === 'CUSTOMER') {
          this.route.navigate(['/profile/myProfile']);
        } else {
          console.log('none');
        }

      },
      (error) => {
        this.chargement = false;
        this.incorrectLogin = true;
        setTimeout(() => {
          this.incorrectLogin = false;

        }, 5000);
      }
    );
  }

  switchToRegister() {
    this.isLogin = !this.isLogin;
    this.form.markAsUntouched();
    this.formLogin.markAsUntouched()
    this.userDto = {}
    this.loginRequest = {}
  };


  hasError($event: boolean) {

  }

  getNumber($event: any) {

  }

  telInputObject($event: any) {
  }

  onCountryChange($event: any) {
    this.prefixNumber = $event.dialCode;
  }


  calculateAge(birthday: Date) { // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  selectAge() {
    // @ts-ignore
    this.dateNaissance = new Date(this.userDto.birthday);
    console.log(this.calculateAge(this.dateNaissance));
    if (this.calculateAge(this.dateNaissance) < 18) {
      this.invalidAge = true;

    } else {
      this.invalidAge = false;

    }
  }

  checkedCompany(event: any) {
    this.isCompany = event.checked
    if (this.isCompany === false) {
      this.userDto.company = '';
    }
  }

  /*
    public handleAddressChange(address: any) {
      // Do some stuff
    }*/


}
