import {Component, OnInit} from '@angular/core';
import {SmsRequest} from '../../models/SmsRequest';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {DhashboardService} from '../../../dashboard/service/dhashboard.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-by-phone-number',
  templateUrl: './confirm-by-phone-number.component.html',
  styleUrls: ['./confirm-by-phone-number.component.scss']
})
export class ConfirmByPhoneNumberComponent implements OnInit {
  smsRequest: SmsRequest = {};
  email: any;
  isSendPhoneNumber = false;
  code: any;
  displaySuccess: boolean = false;
  displayError: boolean = false;
  displayButtonGo: boolean = true;
  telephoneNumber: string = '';
  prefixNumber: string = ''
  isNotValidNumber: boolean = false;
  subscription?: Subscription;
  selectLang: any = '';

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private dashboardService: DhashboardService, public translate: TranslateService) {
    this.selectLang = localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.selectLang = localStorage.getItem('lang');
    this.email = this.route.snapshot.paramMap.get('mail');
    this.makeRandom();
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang = res;
      console.log(this.selectLang)


    })
    this.translate.use(this.selectLang)

  }

  sendSms() {
    this.smsRequest.phoneNumber = '+' + this.prefixNumber + this.telephoneNumber
    this.smsRequest.message = this.makeRandom();
    this.authenticationService.sendSms(this.smsRequest).subscribe(
      (res) => {
        console.log(this.smsRequest);
        this.isNotValidNumber = false;
        this.isSendPhoneNumber = true;
        this.displayButtonGo = false;

      },
      (error) => {
        this.isNotValidNumber = true;
      }
    );
  }

  makeRandom() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const lengthOfCode = 4;
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(text);
    return text;
  }

  testValidCode() {
    if (this.code === this.smsRequest.message) {
      this.authenticationService.confirmAccountSms(this.email, this.smsRequest.phoneNumber).subscribe(
        (res) => {
          console.log('confirm');
        },
        (error) => {
          console.log('NotConfirmed');

        }
      );
      this.displaySuccess = true;

    } else {
      this.displayError = true;

    }
  }

  hasError($event: boolean) {
    console.log($event)
    console.log('error')

  }

  getNumber($event: any) {
    console.log($event)
    console.log('getNumber')
  }

  telInputObject($event: any) {
    console.log($event)
    console.log('telinput')

  }

  onCountryChange($event: any) {
    console.log($event);
    this.prefixNumber = $event.dialCode;
  }


}
