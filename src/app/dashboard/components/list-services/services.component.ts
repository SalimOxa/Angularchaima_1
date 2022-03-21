import {Component, OnInit} from '@angular/core';
import {Service} from '../../model/service';
import {DhashboardService} from '../../service/dhashboard.service';
import {Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {NewBackOfficeService} from '../../../new-back-office/service/new-back-office.service';
import {MetaServiceService} from '../../service/meta-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-list-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  lang: any;
  errorMessages = '';
  listServices: Service[] = [];
  displayBasic: boolean = false;
  subscription?: Subscription;
  selectLang: any = 'EN'

  keyword: string = 'racine service';


  host = environment.apiBaseUrl + '/api/v1';

  constructor(private route: Router, private metaService: MetaServiceService, private title: Title, private meta: Meta, private dashboardService: DhashboardService, private servicesBackOfficesService: NewBackOfficeService,) {
    this.selectLang = localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang = res;

    })
    this.getAllServices();

  }


  getAllServices() {

    this.servicesBackOfficesService.getAllServices().subscribe(
      response => {
        this.listServices = response;
        console.log(this.listServices);
        this.listServices.forEach((value) => {
          // @ts-ignore
          this.keyword = this.keyword.concat(value.keyWords);
        });
        this.meta.addTag({name: 'keywords', content: this.keyword})
        // this.metaService.setCanonicalURL();

      }, error => {

      }
    )


  }

  goToSevice(id: any) {
    this.route.navigate(['/list-services', id]);

  }
}
