import {Component,  OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../../common/constant/GlobalConstants';
import {MetaServiceService} from "../../service/meta-service.service";
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../service/dhashboard.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  displayDialog=false;
  subscription?: Subscription;
  selectLang:any='';
  titleDialogue:string='title'



  constructor(private title: Title, private meta: Meta, private metaService: MetaServiceService,private dashboardService:DhashboardService) {
 this.selectLang=localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.selectLang=localStorage.getItem('lang');
    this.meta.updateTag({name: 'description', content: GlobalConstants.About})
    this.meta.updateTag({name: 'keywords', content: GlobalConstants.KeyWordsAbout})
  //  this.metaService.setCanonicalURL();
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {

      this.selectLang =res;

    })


  }



  showDialog(title:any) {
  this.displayDialog=true;
  this.titleDialogue=title;

  }

  closeDialog() {
    this.displayDialog=false;

  }

}
