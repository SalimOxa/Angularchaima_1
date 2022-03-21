import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../service/dhashboard.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  subscription?: Subscription;
  selectLang:any ="EN"
  constructor(private dashboardService:DhashboardService) {
    this.selectLang=localStorage.getItem('lang');
  }

  ngOnInit(): void {

    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang =res;
  })

}
}
