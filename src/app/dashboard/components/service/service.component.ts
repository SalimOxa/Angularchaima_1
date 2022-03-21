import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewBackOfficeService} from '../../../new-back-office/service/new-back-office.service';
import {Service} from '../../model/service';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer, Meta, SafeResourceUrl} from '@angular/platform-browser';
import {MetaServiceService} from '../../service/meta-service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  host = environment.apiBaseUrl + '/api/v1';
  id: any;
  service:Service={};
  lang:any;
  urlVideo:string='';
  iframeUrl: SafeResourceUrl | undefined;
  constructor(private sanitizer :DomSanitizer,private meta: Meta,private metaService: MetaServiceService, public translate: TranslateService,private route: ActivatedRoute,private newBackOfficesService: NewBackOfficeService,) {

    this.translate.use(<string>localStorage.getItem('lang'))


  }
  ngOnInit(): void {
    window.scroll(0,0);
    this.id = this.route.snapshot.paramMap.get('id');
    this.lang = localStorage.getItem("lang") || {};

      this.newBackOfficesService.getService(this.id).subscribe(response=>{
        this.service=response
        console.log(this.service.keyWords)
        // @ts-ignore
        this.meta.updateTag({name: 'service', content: this.service.keyWords})
       // this.metaService.setCanonicalURL();
        if (this.service.videoURL != null) {

          // @ts-ignore
          this.iframeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.service.videoURL);
        }

      })


  }

}
