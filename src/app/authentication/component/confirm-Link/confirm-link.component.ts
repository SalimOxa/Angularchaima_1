import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from 'rxjs';
import {DhashboardService} from '../../../dashboard/service/dhashboard.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-phone-number',
  templateUrl: './confirm-link.html',
  styleUrls: ['./confirm-link.components.scss'],
})
export class ConfirmLinkComponent implements OnInit {
  email: any;
  subscription?: Subscription;
  selectLang:any='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService:DhashboardService,
    public translate: TranslateService) {
    this.selectLang=localStorage.getItem('lang');

  }
  ngOnInit(): void {
    this.selectLang=localStorage.getItem('lang');
    this.email = this.route.snapshot.paramMap.get('mail');
    this.subscription = this.dashboardService.getLanguage().subscribe(res => {
      this.selectLang =res;


    })

 this.translate.use(this.selectLang)
  }
  confirmByPhone() {
    this.router.navigate(['/confirmByPhone', this.email]);

  }


}
