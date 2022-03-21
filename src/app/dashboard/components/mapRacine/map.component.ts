import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact';
import {DhashboardService} from '../../service/dhashboard.service';
import {GlobalConstants} from '../../../common/constant/GlobalConstants';
import {Meta, Title} from '@angular/platform-browser';
import {MetaServiceService} from '../../service/meta-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  contactForm: Contact = new Contact;
  subscription?: Subscription;
  arabic_language: boolean = false;
  selectLang: any = '';

  constructor(private dhashboardService: DhashboardService, private title: Title, private meta: Meta, private metaService: MetaServiceService) {

    this.selectLang = localStorage.getItem('lang');

  }

  ngOnInit(): void {
    this.selectLang = localStorage.getItem('lang');

    //this.title.setTitle(GlobalConstants.Dashbord)
    this.meta.updateTag({name: 'description', content: GlobalConstants.Contact})
    this.meta.updateTag({name: 'keywords', content: GlobalConstants.KeyWordsContact})

    this.metaService.setCanonicalURL();
    this.subscription = this.dhashboardService.getLanguage().subscribe(res => {
      this.selectLang = res;
      if (this.selectLang === 'AR') {

        this.arabic_language = true;


      } else {

        this.arabic_language = false;
      }
    })

    if (this.selectLang === 'AR') {

      this.arabic_language = true;


    } else {

      this.arabic_language = false;
    }

  }

}


