import {Component, HostListener, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {DhashboardService} from '../../service/dhashboard.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  titles: any;
  selectedLang: string = '';
  languges: string[] = [];
  header_variable: boolean = false;

  constructor(
    public translate: TranslateService, private data: DataService,
    private route: Router,
    private userStore: UserStoreService,
    private dashService: DhashboardService
  ) {
    if (localStorage.getItem('lang') === null) {
      this.selectedLang = this.translate.getBrowserLang().toUpperCase()
      translate.setDefaultLang(this.selectedLang)
      localStorage.removeItem('lang');
      localStorage.setItem('lang', this.selectedLang);
    } else {
      translate.use(<string>localStorage.getItem('lang'));
      this.selectedLang = <string>localStorage.getItem('lang');
      localStorage.setItem('lang', this.selectedLang);
    }

  }

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {


    if (e.target['scrollingElement'].scrollTop === 0) {

      this.header_variable = false;

    } else {
      this.header_variable = true;
    }

  }

  ngOnInit() {
    window.scroll(0, 0);
    this.titles = document.getElementsByClassName('titles')[0];
    this.translate.addLangs(['EN', 'FR', 'AR']);
    this.languges = this.translate.getLangs();


  }

  scrollTo() {
    console.log('scrolle')
    window.scrollTo({
      top: 2000,
      left: 100,
      behavior: 'smooth'
    });
  }

  changeLanguage() {
    this.translate.use(this.selectedLang)
    localStorage.removeItem('lang');
    localStorage.setItem('lang', this.selectedLang);
    this.data.changeLanguge(this.selectedLang)
    this.dashService.sendLanguageForService(this.selectedLang);


    this.dashService.sendLanguage(this.selectedLang);

  }

  login() {
    const user = this.userStore.parseJWT();
    if (!this.userStore.loadToken()) {
      this.route.navigate(['register']);

    } else {
      if (user.roles[0] === 'MASTER') {
        this.route.navigate(['/new-back-office/dashboard/list-project']);
        return;
      }
      if (user.roles[0] === 'ADMIN') {
        this.route.navigate(['/new-back-office/dashboard/list-project']);
      } else {
        this.route.navigate(['/profile/myProfile']);
      }

    }


  }

  displayIconBars(event: any) {

    // @ts-ignore
    if (document.getElementById('menu-control').checked === true) {
      for (let i = 0; i < 3; i++) {

        let bars = document.getElementsByClassName('hamburger__icon')[i];
        // @ts-ignore
        bars.style.display = 'none'
      }


      // @ts-ignore
      this.disableScroll();
      // @ts-ignore
      this.titles.style.display = 'none'


    }
  }

  hideSidebar() {
    // @ts-ignore
    document.getElementById('menu-control').checked = false;
    // @ts-ignore
    this.titles.style.display = 'block'
    for (let i = 0; i < 3; i++) {

      let bars = document.getElementsByClassName('hamburger__icon')[i];
      // @ts-ignore
      bars.style.display = 'block'
    }


    this.enableScroll()


  }

  disableScroll() {

    window.onscroll = function () {
      window.scrollTo(0, 0);
      window.pageXOffset.toFixed()
    };
  }

  enableScroll() {
    window.onscroll = function () {
    };
  }

  toAbout() {
    this.hideSidebar()

    // @ts-ignore
    document.getElementById('about').scrollIntoView({behavior: 'smooth'})

  }

  toService() {
    this.hideSidebar()
    // @ts-ignore
    document.getElementById('service').scrollIntoView({behavior: 'smooth'})
  }

  toWorks() {
    this.hideSidebar()
    // @ts-ignore
    document.getElementById('works').scrollIntoView({behavior: 'smooth'})
  }

  toContact() {
    this.hideSidebar()
    // @ts-ignore
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'})
  }

  toHome() {
    this.hideSidebar()
    // @ts-ignore
    document.getElementById('header').scrollIntoView({behavior: 'smooth'})
  }

  toPartner() {
    this.hideSidebar()
    // @ts-ignore
    document.getElementById('partner').scrollIntoView({behavior: 'smooth'})

  }
}
