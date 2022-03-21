import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../../service/dhashboard.service';

@Component({
  selector: 'app-rights-reserved',
  templateUrl: './rights-reserved.component.html',
  styleUrls: ['./rights-reserved.component.css']
})
export class RightsReservedComponent implements OnInit {
  subscription?: Subscription;
  selectLang:any='';
  constructor(public translate: TranslateService,private dashboardService:DhashboardService) {
    this.selectLang=localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.selectLang=localStorage.getItem('lang');
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {

      this.selectLang =res;})


  }

}
