import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {MetaServiceService} from '../../service/meta-service.service';
import {DhashboardService} from '../../service/dhashboard.service';

@Component({
  selector: 'app-Banner2',
  templateUrl: './Banner2.component.html',
  styleUrls: ['./Banner2.component.scss']
})
export class Banner2Component implements OnInit {
  selectLang:any ="EN"
  subscription?: Subscription;
  constructor(private title: Title, private meta: Meta, private metaService: MetaServiceService,private dashboardService:DhashboardService) {
    this.selectLang=localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.selectLang=localStorage.getItem('lang');
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {

      this.selectLang =res;

    })
  }

}
