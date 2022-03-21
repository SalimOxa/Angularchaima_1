import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private langugeSource = new BehaviorSubject('');
  currentLanguge= this.langugeSource.asObservable();
  constructor() { }


  changeLanguge(languge: string) {
    this.langugeSource.next(languge)
  }

}
