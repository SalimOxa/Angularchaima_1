import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from '../../../dashboard/service/data.service';
import {Router} from '@angular/router';
import {DhashboardService} from '../../../dashboard/service/dhashboard.service';

@Component({
  selector: 'app-top-bar-authentication',
  templateUrl: './top-bar-authentication.component.html',
  styleUrls: ['./top-bar-authentication.component.css']
})
export class TopBarAuthenticationComponent implements OnInit {

  browserLang:string | null='';

  constructor(
    public translate: TranslateService,private data: DataService,
    private route :Router,
    private dashService: DhashboardService


  ) {

    this.browserLang =this.translate.getBrowserLang().toUpperCase()
    translate.addLangs(["EN", "FR", "AR"]);
    this.browserLang=localStorage.getItem('lang');
    if (this.browserLang !== null) {
      translate.setDefaultLang(this.browserLang)
      translate.use(this.browserLang)
    }
    }

  ngOnInit(){


  }
  changeLanguage(lang:any){
    this.translate.use(lang.target.value)
    localStorage.setItem('lang',lang.target.value);
    this.data.changeLanguge(lang.target.value)
    this.dashService.sendLanguage(lang.target.value);
    this.dashService.sendLanguageForService(lang.target.value);

  }

}
