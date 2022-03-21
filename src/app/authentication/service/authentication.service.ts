import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import {UserDto} from "../../common/user-dto";
import {AuthenticationRequest} from "../models/authentication-request";
import { SmsRequest } from '../models/SmsRequest';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private http: HttpClient) {

   }

 logIn(authenticationRequest:AuthenticationRequest) {
    return this.http.post(environment.apiBaseUrl + `/login`, authenticationRequest, {
      observe: "response",
    });
  }

register(user:UserDto){

  return this.http.post(environment.apiBaseUrl + `/register-costumer`,user, {
    observe: "response",
  });
}

sendSms(smsRequest:SmsRequest){

  return this.http.post(environment.apiBaseUrl + `/api/v1/api/sms`,smsRequest, {
    observe: "response",
  });
}
confirmAccountEmail(code: string) {
  return this.http.put(environment.apiBaseUrl + `/api/v1/confirmAccount`, code, {
    observe: "response",
  });
}


  confirmAccountSms(email: string, phoneNumber: string | undefined) {
  return this.http.put(environment.apiBaseUrl + `/api/v1/confirmAccountSms/${email}/${phoneNumber}`, {
    observe: "response",
  });
}
}
