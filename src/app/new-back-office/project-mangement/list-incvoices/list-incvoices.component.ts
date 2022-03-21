import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Project} from '../../../shared-module/model/project';
import {TranchePayment} from '../../../shared-module/model/tranchePayment';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {ActivatedRoute} from '@angular/router';
import {Table} from 'primeng/table';
import {UserDto} from '../../../common/user-dto';
import {environment} from '../../../../environments/environment';
import {StompService} from '../../../shared-module/services/stomp.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-list-incvoices',
  templateUrl: './list-incvoices.component.html',
  styleUrls: ['./list-incvoices.component.scss']
})
export class ListIncvoicesComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  user: any;
  idProject: any;
  first = 0;
  rows = 5;
  currentNameProject: string | undefined = ''
  displayListTranch = false;
  listTranches: TranchePayment[] | undefined = [];
  statuses: any[] = [];
  cols: any[] = [];
  projects: Project[] | undefined = [];
  displayBasic: boolean = false;
  host = environment.apiBaseUrl + '/api/v1';
  currentId: any;
  currentName: string | undefined = '';
  subscription?: Subscription;
  loading = false;

  constructor(private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private newBackOfficeService: NewBackOfficeService, private stompService: StompService
  ) {
  }

  ngOnInit(): void {
    this.statuses = [
      {label: 'Paid', value: 'Paid'},
      {label: 'Unpaid', value: 'Unpaid'},

    ];
    this.user = this.userStoreService.parseJWT();
    this.getProjectByMaster();
    this.subscription = this.stompService.getName().subscribe(res => {
        if (res === 'payment_type') {
          setTimeout(() => {
            this.getProjectByMaster();
          }, 1000);
        }
      }
    )
    this.items = [
      {label: 'List Tranches For Payment '},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};


    this.cols = [
      {field: 'NAME', header: 'NAME'},
      {field: 'DESCRIPTION', header: 'DESCRIPTION'},
      {field: 'deadline', header: 'deadline'},
      {field: 'ADMIN', header: 'ADMIN'},
      {field: 'STATMENT', header: 'STATMENT'},
      {field: 'DELETE', header: 'DELETE'},
      {field: 'DETAIL', header: 'DETAIL'}
    ];
  }

// fix me id master
  getProjectByMaster() {
    this.loading = true;
    this.newBackOfficeService.getAllProjectByMaster(this.user.sub).subscribe(response => {
      this.projects = response;
      this.loading = false;
    })
  }


  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.projects
      ? this.first === (this.projects.length - this.rows)
      : true;
  }

  isFirstPage(): boolean {
    return this.projects ? this.first === 0 : true;
  }


  clear(table: Table) {
    table.clear();
  }

  showListInvoices(project: Project) {
    this.displayListTranch = true;
    this.getTranchePaymentForPayemnts(project.id)
    this.currentNameProject = project.name;
  }

  showFacturePayment(id: number, name: string) {

    this.currentId = id;
    this.currentName = name;
    this.displayBasic = true;
  }


  getTranchePaymentForPayemnts(idProject: any) {
    this.profileUserService.getAllTrancheByProject(idProject).subscribe((response) => {
      this.listTranches = response
// /Mresevrve and sort backend
      // @ts-ignore
      this.listTranches?.sort((tranch1, tranch2) => tranch1.id - tranch2.id);

    })
  }

}
