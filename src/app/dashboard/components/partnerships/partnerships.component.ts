import { Component, OnInit } from '@angular/core';
import {NewBackOfficeService} from '../../../new-back-office/service/new-back-office.service';
import {Partner} from '../../../shared-module/model/partner';
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../service/dhashboard.service';


@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.scss']
})
export class PartnershipsComponent implements OnInit {
  partnerList: Partner[]=[];
  subscription?: Subscription;
  selectLang:any ="EN"


  constructor(private newBackOfficesService: NewBackOfficeService,private dashboardService:DhashboardService,) {
    this.selectLang = localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang =res;

    })
    this.getAllPartner();
  }
  getAllPartner(){
    this.newBackOfficesService.getDashAllPartners().subscribe((response)=> {
      this.partnerList = response;
    },error => {

      })
  }

}
