import {Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserStoreService} from "../../../authentication/stores/user-store/user-store.service";
import {Meta, Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../../common/constant/GlobalConstants';
import {MetaServiceService} from "../../service/meta-service.service";
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../service/dhashboard.service';
import {NewBackOfficeService} from '../../../new-back-office/service/new-back-office.service';
import {Service} from '../../model/service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectLang:any;
  subscription?: Subscription ;
  listServices:Service[]=[];
  keyword:string='racine service';
  @HostListener("window:scroll", ['$event']) onWindowScroll(e:any) {

    let a = document.getElementById('button');


    if (e.target['scrollingElement'].scrollTop > 300) {
      // @ts-ignore
      a.classList.add("show");

    }else{
      // @ts-ignore
      a.classList.remove("show");

    }


  }
  constructor(private title :Title,private meta: Meta,private router: Router,private servicesBackOfficesService: NewBackOfficeService, private userStoreService: UserStoreService ,private metaService: MetaServiceService,private dashboardService:DhashboardService ) {
    this.selectLang=localStorage.getItem('lang');
      document.documentElement.lang=this.selectLang;
  }
  ngOnInit() {
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang =res;


    })
   this. userStoreService.parseJWT()
    this.metaService.setCanonicalURL();

  }

  toTop() {
    // @ts-ignore
    document.getElementById('header').scrollIntoView({behavior :'smooth'});

  }
  getAllServices() {
    this.meta.updateTag({name: 'description', content: GlobalConstants.About})
    this.meta.updateTag({name: 'keywords', content: GlobalConstants.KeyWordsAbout})
    this.metaService.setCanonicalURL();

    this.servicesBackOfficesService.getAllServices().subscribe(
      response => {
        this.listServices = response;
        this.listServices.forEach((value) => {
          // @ts-ignore
          this.keyword=this.keyword.concat(value.keyWords);
        });
        this.meta.updateTag({name: 'service', content: this.keyword})
        this.metaService.setCanonicalURL();

      }, error => {

      }
    )


  }
}



