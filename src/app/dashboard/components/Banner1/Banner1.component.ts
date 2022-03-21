import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../service/dhashboard.service';

@Component({
  selector: 'app-Banner1',
  templateUrl: './Banner1.component.html',
  styleUrls: ['./Banner1.component.css']
})
export class Banner1Component implements OnInit {
  subscription?: Subscription;
  selectLang:any ="EN"
  constructor(private dashboardService:DhashboardService) {
    this.selectLang = localStorage.getItem('lang');
  }
  ngOnInit(): void {

    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang =res;
    })

  }

}
