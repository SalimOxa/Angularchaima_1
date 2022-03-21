import {Component, OnInit} from '@angular/core';
import {Project} from '../../../shared-module/model/project';
import {UserDto} from '../../../common/user-dto';
import {LazyLoadEvent, MenuItem} from 'primeng/api';

import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {NewBackOfficeService} from '../../service/new-back-office.service';
import {StatmentOfWork} from '../../../shared-module/model/statmentOfWork';
import {ProfileUserService} from '../../../profile-user/service/profile-user.service';
import {environment} from '../../../../environments/environment';
import {saveAs} from 'file-saver';
import {NgxSpinnerService} from 'ngx-spinner';
import {Model} from '../../../shared-module/model/model';
import {StompService} from '../../../shared-module/services/stomp.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {
  doc: any;
  display: boolean = false;
  displayEnable: boolean = false;
  currentIdProject = 0;
  listProject: Project[] = [];
  displayStatement = false;
  first = 0;
  rows = 2;
  items: MenuItem[] = [];
  host = environment.apiBaseUrl + '/api/v1';
  home: any;
  selectedFiles: any;

  user: any;
  loading = false;
  listPrjectFinal: Project[] = [];
  numberPage = 0;
  sizPage = 3;
  totalRecords: any;
  subscription?: Subscription;
  model: Model = {}
  users: UserDto[] = [];
  deleteAdmin: boolean = false;
  myPaginationString = ''
  nameProject = '';
  nameCustomer = '';
  nameAdmin = '';

  constructor(private newBackOfficesService: NewBackOfficeService,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private router: Router,
              private spinner: NgxSpinnerService, private stompService: StompService) {
    this.user = this.userStoreService.parseJWT()
    this.getAllProjects()

  }

  ngOnInit(): void {

    this.items = [
      {label: 'Project Management'},
      {label: 'List Projects With Admin'},

    ];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.subscription = this.stompService.getName().subscribe(res => {
        if (res === 'project_type') {
          setTimeout(() => {
            this.getAllProjects();
          }, 1000);
        }

      }
    )
  }

  getAllProjects() {
    this.loading = true;
    this.listProject = []

    if (this.user.roles[0] === 'MASTER') {
      this.newBackOfficesService.getAllProjectByMasterByPage({
        idMaster: this.user.sub,
        numberPage: this.numberPage,
        sizePage: this.sizPage,
        nameProject: this.nameProject,
        nameCustomer: this.nameCustomer,
        nameAdmin: this.nameAdmin
      }).subscribe((response) => {
        this.model = response;
        console.log(this.model)
        if (this.model.totalPage) {
          this.totalRecords = this.model.totalPage;
        }
        if (this.model.project) {
          this.listProject = this.model.project;
          console.log(this.listProject)
        }
        this.loading = false;
        this.listPrjectFinal = this.listProject;

      })
    } else
      this.newBackOfficesService.getAllProjectByAdminByPage({
        idAdmin: this.user.sub,
        numberPage: this.numberPage,
        sizePage: this.sizPage,
        nameProject: this.nameProject,
        nameCustomer: this.nameCustomer
      }).subscribe((response) => {
        this.model = response;
        if (this.model.totalPage) {
          this.totalRecords = this.model.totalPage;
        }
        if (this.model.project) {
          this.listProject = this.model.project;
        }
        this.loading = false;

      })


  }

  popupDeleteProject(idProject: number) {
    console.log()
    this.display = true
    this.currentIdProject = idProject;
  }

  deleteProjectFomList() {

    this.newBackOfficesService.deleteProjectFomList(this.currentIdProject, this.user.sub).subscribe(resp => {

        console.log(this.currentIdProject);
        this.getAllProjects();
      }, error => {

        console.log(this.currentIdProject);
        this.getAllProjects()
      }
    )
    this.deleteAdmin = false;

  }

  deleteProject() {
    if (this.user.roles[0] === 'MASTER') {
      this.newBackOfficesService.deleteProject(this.currentIdProject, this.user.sub).subscribe(resp => {

        }, error => {
          this.getAllProjects()
        }
      )
    } else {
      // @ts-ignore
      this.newBackOfficesService.deleteProject(this.currentIdProject, null).subscribe(resp => {

      })
    }
    this.display = false;

  }

  clear(table: Table) {
    this.nameProject = '';
    this.nameCustomer = ''
    this.nameAdmin = ''
    this.getAllProjects();
    table.clear();
  }

  goDetail(id: number) {
    this.router.navigate(['/new-back-office/dashboard/update-project/', id]);

  }

  popupDeleteAdminOfProject(id: number) {

    this.currentIdProject = id;
    this.deleteAdmin = true;
  }

  showBasicDialog(id: number, name: string) {
    this.currentIdProject = id;
    this.doc = name;

    this.displayStatement = true;

    this.profileUserService.downloadFileOfProject(id).subscribe(
      response => {


      })

  }

  download(id: number, fileName: any) {
    console.log('fileName')
    console.log(fileName)
    this.profileUserService.downloadFileOfProject(id).subscribe(
      response => {

        const file = new Blob([response], {type: 'application/octet-stream'});
        saveAs(file, fileName);


      })


  }

  showDeatilPayment(idProject: number) {
    this.router.navigate(['/new-back-office/dashboard/detail-payment-project/', idProject]);
  }

  onPageChange(event: any) {
    console.log(event)
    this.numberPage = event.first;
    this.getAllProjects()
  }


}
