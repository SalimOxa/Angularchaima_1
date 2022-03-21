import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../model/contact';
import {Quote} from "../model/quote";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DhashboardService {
  private subject = new Subject<string>();
  private subjectService = new Subject<string>();


  constructor( private http: HttpClient) { }


  SendUserMail(contact:Contact) {
    console.log(contact);
    return this.http.post(
      environment.apiBaseUrl + `/api/v1/sendMailContact`,
      contact
    );
  }
  sendQuote(quote:Quote) {

    return this.http.post(
      environment.apiBaseUrl + `/api/v1/sendQuote`,
      quote
    );
  }
  sendLanguageForService(name: string | undefined) {

    this.subjectService.next( name );
  }
  getLanguageFromService(): Observable<string> {
    return this.subjectService.asObservable();
  }






  sendLanguage(name: string | undefined) {
    this.subject.next( name );
  }
  getLanguage(): Observable<string> {
    return this.subject.asObservable();
  }




}
