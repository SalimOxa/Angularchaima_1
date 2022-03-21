import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';
import {ProfileUserService} from '../../service/profile-user.service';
import {MenuItem, MessageService} from 'primeng/api';
import {UserDto} from '../../../common/user-dto';
import {Project} from "../../../shared-module/model/project";
import {StatmentOfWork} from "../../../shared-module/model/statmentOfWork";

import {environment} from "../../../../environments/environment";
import {NgxSpinnerService} from 'ngx-spinner';
import {StompService} from '../../../shared-module/services/stomp.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {
  items: MenuItem[] = [];
  home: any;
  user: any;
  userDto: UserDto = {};
  first = 0;
  rows = 5;
  statementOfWork: StatmentOfWork = {};
  password: string = '';
  newPassword: string = '';

  displayPasswordPoupup: boolean = false;
  displayDeletPoupup: boolean = false;
  projects: Project[] | undefined = [];
  currentProject = 1
  selectedFiles: any;
  currentId: number = 1;
  displayBasic: boolean = false;
  fileContent: any;
  // @ts-ignore
  cols: any[] ;
  host = environment.apiBaseUrl + '/api/v1';
  doc: any;
  @Input() isDashboard: boolean | undefined=false;
  jwt:String='';
  subscription?: Subscription ;

  constructor(private route: Router,
              private userStoreService: UserStoreService,
              private profileUserService: ProfileUserService,
              private spinner: NgxSpinnerService,private stompService: StompService) {
    this.user = this.userStoreService.parseJWT();
    this.getUser();
  }

  ngOnInit(): void {
this.subscription=this.stompService.getName().subscribe(res=>{
   if(res==='project_type'){
    setTimeout( ()=> {
      this.getUser();
    }, 1000);
     }
  }
)
    this.jwt=this.userStoreService.getToken();
    this.items = [
      {label: 'My Project '},
      {label: 'List Project'},

    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.cols = [
      { field: 'NAME', header: 'NAME' },
      { field: 'DESCRIPTION', header: 'DESCRIPTION' },
      { field: 'DATE', header: 'DATE' },
      { field: 'ADMIN', header: 'ADMIN' },
      { field: 'SERVICE', header: 'SERVICE' },
      { field: 'STATMENT', header: 'STATMENT' },
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
    return this.userDto.projects
      ? this.first === this.userDto.projects.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.userDto.projects ? this.first === 0 : true;
  }

  deleteProject(idProject: number) {
    this.displayDeletPoupup = true;
    this.currentProject = idProject;



  }

  acceptDelete() {

    this.profileUserService.deleteProject(this.currentProject,this.user.sub).subscribe(
      response => {
        this.displayDeletPoupup = false;
        this.getUser();
      }, error => {
        this.displayDeletPoupup = false;
        this.getUser();


      }
    )
  }

  detailProject(id:number) {
    this.route.navigate(['/profile/etat-project',id]);
  }


  onSelectedfile(event: any) {

    this.selectedFiles = event.target.files;
    this.statementOfWork.fileName = this.selectedFiles.item(0).name
    const formData = new FormData();
    formData.append('file', this.selectedFiles.item(0))
    this.profileUserService.addStatementOfWorkToProject(formData, this.currentId).subscribe(
      response => {


        this.getUser();


      }
    )
  }

  test(id: number) {
    this.currentId = id;

  }

  showBasicDialog(id: number, name: string) {
    this.currentId = id;
    this.doc = name;

    this.displayBasic = true;



  }


}

