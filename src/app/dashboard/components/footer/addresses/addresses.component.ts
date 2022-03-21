import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Meta, Title} from "@angular/platform-browser";
import {MetaServiceService} from "../../../service/meta-service.service";
import {DhashboardService} from "../../../service/dhashboard.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  subscription?: Subscription;
  selectLang:any='';



  constructor(private title: Title, private meta: Meta, private metaService: MetaServiceService,private dashboardService:DhashboardService,private route:Router) {
    this.selectLang=localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {

      this.selectLang =res;})
  }
  toAbout() {

// @ts-ignore
    document.getElementById("about").scrollIntoView({behavior: "smooth"})

  }

  toService() {

    // @ts-ignore
    document.getElementById("service").scrollIntoView({behavior: "smooth"})
  }

  toWorks() {

    // @ts-ignore
    document.getElementById("works").scrollIntoView({behavior: "smooth"})
  }

  toContact() {

    // @ts-ignore
    document.getElementById("contact").scrollIntoView({behavior: "smooth"})
  }

  gotTemesAndCondition() {
    this.route.navigate(['/terms']);

  }
}
