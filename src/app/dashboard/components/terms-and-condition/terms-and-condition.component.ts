import {Component, HostListener, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {
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
  selectLang:any='';
  constructor(public translate: TranslateService) {
    this.translate.use(<string>localStorage.getItem('lang'))
  }

  ngOnInit(): void {
    this.selectLang = localStorage.getItem("lang") || {};
  }
  toTop() {
    window.scrollTo({top:0, behavior: 'smooth'});
  }
}
