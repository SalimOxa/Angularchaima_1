import {Component, Input, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {UserDto} from '../../../common/user-dto';
import {StatmentOfWork} from '../../../shared-module/model/statmentOfWork';
import {Project} from '../../../shared-module/model/project';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-list-payment-project',
  templateUrl: './list-payment-project.component.html',
  styleUrls: ['./list-payment-project.component.scss']
})
export class ListPaymentProjectComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  user: any;
  userDto: UserDto = {};
  projects: Project[] | undefined = [];
  cols: any[]=[] ;
  host = environment.apiBaseUrl + '/api/v1';
  jwt:String='';

  constructor(private route: Router,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private spinner: NgxSpinnerService
             ) {
  }

  ngOnInit(): void {

    this.jwt=this.userStoreService.getToken();
    this.items = [
      {label: 'Payment '},


    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.user = this.userStoreService.parseJWT();
    this.getUser();
    this.cols = [
      { field: 'NAME', header: 'NAME' },
      { field: 'DESCRIPTION', header: 'DESCRIPTION' },
      { field: 'DATE', header: 'DATE' },
      { field: 'ADMIN', header: 'ADMIN' },
      { field: 'STATMENT', header: 'STATMENT' },
      { field: 'DELETE', header: 'DELETE' },
      { field: 'DETAIL', header: 'DETAIL' }
    ];


  }

  getUser() {
    this.spinner.show();

    this.profileUserService.getAllProjectByCustomer(this.user.sub).subscribe((response) => {
      // @ts-ignore
      this.projects = response;
      this.spinner.hide();
    })

  }


















}

